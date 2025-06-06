
import { ChecklistItem, GuidelineContent, TalentProfile, LegalDocument, ChatMessage } from '../types';

export const getChecklistItems = async (): Promise<ChecklistItem[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 'fund1', text: 'Prepare Pitch Deck', completed: true, category: 'fundraising' },
      { id: 'fund2', text: 'Identify Potential Investors', completed: false, category: 'fundraising' },
      { id: 'fund3', text: 'Practice Pitch', completed: false, category: 'fundraising' },
      { id: 'bm1', text: 'Define Value Proposition', completed: true, category: 'businessModel' },
      { id: 'bm2', text: 'Analyze Target Market', completed: true, category: 'businessModel' },
      { id: 'bm3', text: 'Develop Revenue Streams', completed: false, category: 'businessModel' },
    ]), 300);
  });
};

export const getGuidelineData = async (): Promise<{ businessModel: GuidelineContent[], fundraising: GuidelineContent[] }> => {
  // Content inspired by viet-kultura.com/ai/ but simplified
  return new Promise(resolve => {
    setTimeout(() => resolve({
      businessModel: [
        { title: "1. Customer Segments", points: ["Who are your most important customers?", "What are their archetypes?"] },
        { title: "2. Value Propositions", points: ["What value do you deliver?", "Which customer problem are you solving?"] },
        { title: "3. Channels", points: ["How do you reach your customers?", "Which channels are most cost-efficient?"] },
        { title: "4. Customer Relationships", points: ["What type of relationship does each segment expect?", "How do you maintain them?"] },
        { title: "5. Revenue Streams", points: ["For what value are customers willing to pay?", "How do they currently pay?"] },
      ],
      fundraising: [
        { title: "1. Executive Summary", points: ["Company purpose", "Problem being solved", "Solution"] },
        { title: "2. Team", points: ["Key team members and expertise", "Advisory board"] },
        { title: "3. Market Analysis", points: ["Market size and growth potential", "Target audience"] },
        { title: "4. Financial Projections", points: ["3-5 year forecast", "Key assumptions"] },
        { title: "5. Funding Request", points: ["Amount sought", "Use of funds"] },
      ],
    }), 300);
  });
};

export const getTalentProfiles = async (): Promise<{ suitable: TalentProfile[], invited: TalentProfile[], saved: TalentProfile[] }> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      suitable: [
        { id: 'talent1', name: 'Alice Wonderland', role: 'Frontend Developer', matchScore: 92 },
        { id: 'talent2', name: 'Bob The Builder', role: 'Project Manager', matchScore: 88 },
      ],
      invited: [
        { id: 'talent3', name: 'Charlie Brown', role: 'UX Designer', matchScore: 95 },
      ],
      saved: [
        { id: 'talent4', name: 'Diana Prince', role: 'Marketing Lead', matchScore: 90 },
      ],
    }), 300);
  });
};

export const getLegalDocuments = async (): Promise<LegalDocument[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 'legal1', name: 'NDA_Template_v1.docx', type: 'NDA', uploadDate: '2024-07-01', score: 85, issues: ["Clause 3.2 unclear on duration"] },
      { id: 'legal2', name: 'ServiceAgreement_ClientX.pdf', type: 'Service Agreement', uploadDate: '2024-06-15', score: 92, issues: [] },
    ]), 300);
  });
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 'msg1', sender: 'ai', text: 'Hello! How can I assist you with your business today?', timestamp: new Date(Date.now() - 60000 * 5) },
            { id: 'msg2', sender: 'user', text: 'I need help refining my business model.', timestamp: new Date(Date.now() - 60000 * 4) },
            { id: 'msg3', sender: 'ai', text: 'Great! Let\'s start with your value proposition. Can you describe it to me?', timestamp: new Date(Date.now() - 60000 * 3) },
        ]), 300);
    });
};
    