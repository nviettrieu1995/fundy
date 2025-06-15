import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { User, UserMembershipType } from '../types'; // UserMembershipType is the enum for user.membership
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/authService';
import { USER_MEMBERSHIP_PLANS } from '../constants'; // For default plan name
import { purchaseCredits as purchaseCreditsAPI, upgradeMembership as upgradeMembershipAPI, PaymentResponse } from '../services/paymentService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<User | null>;
  updateUser: (updatedUser: Partial<User>) => void;
  purchaseCredits: (amount: number) => Promise<PaymentResponse>;
  upgradeMembershipPlan: (membership: UserMembershipType) => Promise<PaymentResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      // Ensure backward compatibility or set defaults for new fields if not present
      if (!parsedUser.membershipRoleType) {
        if (parsedUser.isAdmin) parsedUser.membershipRoleType = 'admin';
        else if (parsedUser.isWorker) parsedUser.membershipRoleType = 'worker';
        else parsedUser.membershipRoleType = 'user';
      }
      if (!parsedUser.membershipPlanName) {
        // A basic default, could be more sophisticated based on role/membership enum
        parsedUser.membershipPlanName = parsedUser.membershipRoleType === 'user'
          ? USER_MEMBERSHIP_PLANS[parsedUser.membership as UserMembershipType]?.name || UserMembershipType.Free
          : 'Default Plan';
      }
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const result = await apiLogin(email, pass);
      if (result) {
        localStorage.setItem('authUser', JSON.stringify(result));
        setUser(result);
      }
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    await apiLogout();
    localStorage.removeItem('authUser');
    setUser(null);
    setLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, pass: string) => {
    setLoading(true);
    const result = await apiRegister(name, email, pass);
    if (result) {
      localStorage.setItem('authUser', JSON.stringify(result));
      setUser(result);
    }
    setLoading(false);
    return result;
  }, []);
  
  const updateUser = useCallback((updatedFields: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem('authUser', JSON.stringify(newUser));
      return newUser;
    });
  }, []);

  const purchaseCredits = useCallback(async (amount: number): Promise<PaymentResponse> => {
    if (!user) return { success: false, message: 'User not logged in' };
    const res = await purchaseCreditsAPI(user.id, amount);
    if (res.success) {
      updateUser({ credits: (user.credits || 0) + amount });
    }
    return res;
  }, [user, updateUser]);

  const upgradeMembershipPlan = useCallback(async (membership: UserMembershipType): Promise<PaymentResponse> => {
    if (!user) return { success: false, message: 'User not logged in' };
    const res = await upgradeMembershipAPI(user.id, membership);
    if (res.success) {
      updateUser({ membership, membershipPlanName: USER_MEMBERSHIP_PLANS[membership].name });
    }
    return res;
  }, [user, updateUser]);


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser, purchaseCredits, upgradeMembershipPlan }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};