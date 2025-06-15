import { User } from '../types';

const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const login = async (email: string, pass: string): Promise<User | null> => {
  return fetchJson<User | null>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass })
  });
};

export const register = async (name: string, email: string, pass: string): Promise<User | null> => {
  return fetchJson<User | null>('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password: pass })
  });
};

export const logout = async (): Promise<void> => {
  await fetchJson('/api/auth/logout', { method: 'POST' });
};

export const getAllUsers = async (): Promise<User[]> => {
  return fetchJson<User[]>('/api/admin/users');
};

export const updateUserByAdmin = async (updatedUser: User): Promise<User | null> => {
  return fetchJson<User | null>(`/api/admin/users/${updatedUser.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
  });
};

export const deleteUserByAdmin = async (userId: string): Promise<boolean> => {
  const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
  return res.ok;
};
