
import { ChecklistItem, GuidelineContent, TalentProfile, LegalDocument, ChatMessage } from '../types';

const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const getChecklistItems = async (): Promise<ChecklistItem[]> => {
  return fetchJson('/api/checklist');
};

export const getGuidelineData = async (): Promise<{ businessModel: GuidelineContent[]; fundraising: GuidelineContent[] }> => {
  return fetchJson('/api/guidelines');
};

export const getTalentProfiles = async (): Promise<{ suitable: TalentProfile[]; invited: TalentProfile[]; saved: TalentProfile[] }> => {
  return fetchJson('/api/talent');
};

export const getLegalDocuments = async (): Promise<LegalDocument[]> => {
  return fetchJson('/api/legal-documents');
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const data = await fetchJson<ChatMessage[]>('/api/chat/history');
  return data.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
};
    