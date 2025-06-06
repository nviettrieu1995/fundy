import { User, UserMembershipType, WorkerMembershipType } from '../types';
import { DEFAULT_AVATAR_URL, MOCK_USER_EMAIL, MOCK_USER_PASSWORD, MOCK_WORKER_EMAIL, MOCK_WORKER_PASSWORD, MOCK_ADMIN_EMAIL, MOCK_ADMIN_PASSWORD, USER_MEMBERSHIP_PLANS, WORKER_MEMBERSHIP_PLANS } from '../constants';

// Simulate a database of users
const users: User[] = [
  {
    id: 'user-demo-regular',
    email: MOCK_USER_EMAIL,
    name: 'Demo User',
    avatarUrl: DEFAULT_AVATAR_URL,
    credits: 100,
    membership: UserMembershipType.Free,
    membershipPlanName: USER_MEMBERSHIP_PLANS[UserMembershipType.Free].name,
    membershipRoleType: 'user',
    isAdmin: false,
    isWorker: false,
    phone: '0900123456'
  },
  {
    id: 'user-admin-main',
    email: MOCK_ADMIN_EMAIL,
    name: 'Admin User',
    avatarUrl: DEFAULT_AVATAR_URL,
    credits: 9999,
    membership: UserMembershipType.Professional, // Admins might have a user-type plan for previews
    membershipPlanName: USER_MEMBERSHIP_PLANS[UserMembershipType.Professional].name,
    membershipRoleType: 'admin', // Special role type for admin
    isAdmin: true,
    isWorker: false,
    phone: '0987654321'
  },
  {
    id: 'user-worker-demo',
    email: MOCK_WORKER_EMAIL,
    name: 'Demo Worker',
    avatarUrl: DEFAULT_AVATAR_URL,
    credits: 50,
    membership: UserMembershipType.Free, // Workers might start free or a specific worker plan
    membershipPlanName: WORKER_MEMBERSHIP_PLANS[WorkerMembershipType.WorkerAdvanced].name, // Default to a worker plan
    membershipRoleType: 'worker',
    isAdmin: false,
    isWorker: true,
    phone: '0912987654'
  },
];

export const mockLogin = (email: string, pass: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser) {
        // In real app, verify password (pass === foundUser.passwordHash or similar)
        // For mock, we use predefined passwords from constants
        if (email === MOCK_ADMIN_EMAIL && pass === MOCK_ADMIN_PASSWORD && foundUser.isAdmin) {
          resolve(foundUser);
          return;
        }
        if (email === MOCK_WORKER_EMAIL && pass === MOCK_WORKER_PASSWORD && foundUser.isWorker) {
          resolve(foundUser);
          return;
        }
        if (email === MOCK_USER_EMAIL && pass === MOCK_USER_PASSWORD && !foundUser.isAdmin && !foundUser.isWorker) {
          resolve(foundUser);
          return;
        }
        // Fallback for other test users if passwords aren't strictly checked for them in mock
        // resolve(foundUser); 
        resolve(null); // If password doesn't match for specific mocks
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const mockRegister = (name: string, email: string, _pass: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (users.find(u => u.email === email)) {
        resolve(null); // User already exists
        return;
      }
      const newUser: User = {
        id: `user${users.length + 1}`,
        email,
        name,
        avatarUrl: DEFAULT_AVATAR_URL,
        credits: 5, 
        membership: UserMembershipType.Free,
        membershipPlanName: USER_MEMBERSHIP_PLANS[UserMembershipType.Free].name,
        membershipRoleType: 'user',
        isAdmin: false,
        isWorker: false,
        phone: ''
      };
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

// Function for admin to get all users (mock)
export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return non-admin, non-worker users by default for "User Management"
      resolve(users.filter(u => !u.isAdmin && !u.isWorker)); 
    }, 300);
  });
};

// Function for admin to update a user (mock)
export const updateUserByAdmin = (updatedUser: User): Promise<User | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedUser };
                resolve(users[index]);
            } else {
                resolve(null);
            }
        }, 300);
    });
};

// Function for admin to delete a user (mock)
export const deleteUserByAdmin = (userId: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = users.findIndex(u => u.id === userId);
            // Prevent deleting admin or worker from this generic function for safety
            if (index !== -1 && !users[index].isAdmin && !users[index].isWorker) { 
                users.splice(index, 1);
                resolve(true);
            } else {
                resolve(false);
            }
        }, 300);
    });
};