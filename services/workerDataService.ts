import { CompanyView, WorkerScores, WorkerCertificateDetails, ClassSchedule, CompanyListingDetails } from '../types';

const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const getWorkerOverviewData = async (): Promise<{
  profileViews: CompanyView[];
  scores: WorkerScores;
  certificates: WorkerCertificateDetails[];
  verifications: { id: string; name: string; status: 'Verified' | 'Pending' | 'Not Verified'; verificationDate?: string }[];
}> => {
  return fetchJson('/api/worker/overview');
};

export const getClassSchedules = async (): Promise<ClassSchedule[]> => {
  return fetchJson('/api/worker/classes');
};

export const getCompanyListings = async (): Promise<{
  verified: CompanyListingDetails[];
  unverified: CompanyListingDetails[];
  invited: CompanyListingDetails[];
}> => {
  return fetchJson('/api/worker/company-listings');
};
