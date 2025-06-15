import { User, AdminOverviewStats, GeneratedCode } from '../types';

const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const getAdminOverviewStats = async (): Promise<AdminOverviewStats> => {
  return fetchJson('/api/admin/overview');
};

export const getManagedUsers = async (): Promise<User[]> => {
  return fetchJson('/api/admin/users');
};

export const updateManagedUser = async (userToUpdate: User): Promise<User | null> => {
  return fetchJson(`/api/admin/users/${userToUpdate.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userToUpdate)
  });
};

export const deleteManagedUser = async (userId: string): Promise<boolean> => {
  const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
  return res.ok;
};

export const getMembershipPlansEditable = async (): Promise<any> => {
  return fetchJson('/api/admin/membership-plans');
};

export const updateMembershipPlanMock = async (planKey: string, updatedPlan: any) => {
  await fetchJson(`/api/admin/membership-plans/${planKey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPlan)
  });
};

export const getCreditPriceEditable = async (): Promise<number> => {
  return fetchJson('/api/admin/credit-price');
};

export const updateCreditPriceMock = async (newPrice: number) => {
  await fetchJson('/api/admin/credit-price', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price: newPrice })
  });
};

export const getGeneratedCodes = async (): Promise<GeneratedCode[]> => {
  return fetchJson('/api/admin/generated-codes');
};

export const addGeneratedCode = async (code: GeneratedCode): Promise<GeneratedCode> => {
  return fetchJson('/api/admin/generated-codes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(code)
  });
};
