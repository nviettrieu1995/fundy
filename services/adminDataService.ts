
import { User, UserMembershipType, AdminOverviewStats, GeneratedCode } from '../types';
import { DEFAULT_AVATAR_URL, USER_MEMBERSHIP_PLANS, CREDIT_PRICE_VND } from '../constants';

let mockUsers: User[] = [
  { id: 'usr_001', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', membership: UserMembershipType.Advanced, credits: 150, avatarUrl: DEFAULT_AVATAR_URL, membershipRoleType: 'user' },
  { id: 'usr_002', name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', membership: UserMembershipType.Free, credits: 5, avatarUrl: DEFAULT_AVATAR_URL, membershipRoleType: 'user' },
  { id: 'usr_003', name: 'Carol White', email: 'carol@example.com', phone: '555-0103', membership: UserMembershipType.Professional, credits: 1200, avatarUrl: DEFAULT_AVATAR_URL, membershipRoleType: 'user' },
  { id: 'usr_004', name: 'David Brown', email: 'david@example.com', phone: '555-0104', membership: UserMembershipType.Free, credits: 20, avatarUrl: DEFAULT_AVATAR_URL, membershipRoleType: 'user' },
  { id: 'usr_005', name: 'Eve Davis', email: 'eve@example.com', phone: '555-0105', membership: UserMembershipType.Advanced, credits: 80, avatarUrl: DEFAULT_AVATAR_URL, membershipRoleType: 'user' },
];

mockUsers = mockUsers.map(u => ({
    ...u,
    membershipPlanName: USER_MEMBERSHIP_PLANS[u.membership].name
}));


let mockGeneratedCodes: GeneratedCode[] = [
    { id: 'code_001', code: 'PROMO2024', type: 'coupon', details: '15% off first month', isUsed: false, createdAt: new Date(Date.now() - 86400000 * 5) },
    { id: 'code_002', code: 'ADVFREE01', type: 'membership', details: 'Advanced Plan - 1 Month Free', isUsed: true, createdAt: new Date(Date.now() - 86400000 * 10) },
    { id: 'code_003', code: 'SAVEBIG10', type: 'coupon', details: '10 USD off', isUsed: false, createdAt: new Date(Date.now() - 86400000 * 2) },
];


export const getAdminOverviewStats = async (): Promise<AdminOverviewStats> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      totalActiveUsers: mockUsers.length,
      totalCreditsUsed: mockUsers.reduce((sum, user) => sum + (user.credits < 500 ? (500-user.credits) : 0),0) + 5000, // Mock usage
      totalRevenueFromCredits: (mockUsers.reduce((sum, user) => sum + (user.credits < 500 ? (500-user.credits) : 0),0) + 5000) * CREDIT_PRICE_VND * 0.7, // Mock
      totalRevenueFromMemberships: mockUsers.filter(u=>u.membership !== UserMembershipType.Free).length * 1000000, // Mock
      recentChatSnippets: [
        { user: 'alice@example.com', snippet: 'Can you help me with my pitch deck?', timestamp: new Date(Date.now() - 3600000) },
        { user: 'bob@example.com', snippet: 'What are the first steps to fundraising?', timestamp: new Date(Date.now() - 7200000) },
      ],
      aiSuggestions: [
        "Consider adding a tutorial for new users on the checklist feature.",
        "Monitor chat topics to identify common user pain points.",
        "Offer a discount for annual membership subscriptions."
      ]
    }), 500);
  });
};

export const getManagedUsers = async (): Promise<User[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...mockUsers]), 500);
  });
};

export const updateManagedUser = async (userToUpdate: User): Promise<User | null> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const index = mockUsers.findIndex(u => u.id === userToUpdate.id);
            if (index !== -1) {
                mockUsers[index] = { ...mockUsers[index], ...userToUpdate };
                // Update membershipPlanName if membership enum changed
                if (userToUpdate.membership && USER_MEMBERSHIP_PLANS[userToUpdate.membership]) {
                  mockUsers[index].membershipPlanName = USER_MEMBERSHIP_PLANS[userToUpdate.membership].name;
                }
                resolve(mockUsers[index]);
            } else {
                resolve(null);
            }
        }, 300);
    });
};

export const deleteManagedUser = async (userId: string): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const initialLength = mockUsers.length;
            mockUsers = mockUsers.filter(u => u.id !== userId);
            resolve(mockUsers.length < initialLength);
        }, 300);
    });
};

export const getMembershipPlansEditable = async (): Promise<typeof USER_MEMBERSHIP_PLANS> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(JSON.parse(JSON.stringify(USER_MEMBERSHIP_PLANS))), 200); // Deep copy
    });
};

export const updateMembershipPlanMock = async (planKey: keyof typeof USER_MEMBERSHIP_PLANS, updatedPlan: any) => {
    console.log("Mock update membership plan:", planKey, updatedPlan);
    // In a real app, this would update constants or a backend.
    // For this mock, we'll just log it. We can't easily update the imported USER_MEMBERSHIP_PLANS object.
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
};

export const getCreditPriceEditable = async (): Promise<number> => {
    return new Promise(resolve => setTimeout(() => resolve(CREDIT_PRICE_VND), 200));
};

export const updateCreditPriceMock = async (newPrice: number) => {
    console.log("Mock update credit price:", newPrice);
    // Similarly, this would update a backend.
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
};

export const getGeneratedCodes = async (): Promise<GeneratedCode[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve([...mockGeneratedCodes]), 300);
    });
};

export const addGeneratedCode = async (code: GeneratedCode): Promise<GeneratedCode> => {
    return new Promise(resolve => {
        setTimeout(() => {
            mockGeneratedCodes.unshift(code); // Add to the beginning
            resolve(code);
        }, 300);
    });
};