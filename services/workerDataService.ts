import { CompanyView, WorkerScores, WorkerCertificateDetails, ClassSchedule, CompanyListingDetails } from '../types';
import { DEFAULT_AVATAR_URL } from '../constants';

export const getWorkerOverviewData = async (): Promise<{
  profileViews: CompanyView[];
  scores: WorkerScores;
  certificates: WorkerCertificateDetails[];
  verifications: { id: string; name: string; status: 'Verified' | 'Pending' | 'Not Verified'; verificationDate?: string }[];
}> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      profileViews: [
        { id: 'comp1', name: 'Tech Solutions Inc.', logoUrl: `https://via.placeholder.com/40/007bff/ffffff?text=TS`, viewDate: '2024-07-28' },
        { id: 'comp2', name: 'Innovate Hub', logoUrl: `https://via.placeholder.com/40/28a745/ffffff?text=IH`, viewDate: '2024-07-27' },
      ],
      scores: {
        trust: 85, // Points
        heating: 70, // Points, could represent market demand or activity
        growth: 90, // Points, potential for growth
      },
      certificates: [
        { id: 'cert1', name: 'Advanced Frontend Development', issuer: 'viet-kultura.com', issueDate: '2024-06-15', isVerified: true, url: '#' },
        { id: 'cert2', name: 'Project Management Fundamentals', issuer: 'Coursera', issueDate: '2023-12-01', isVerified: false },
      ],
      verifications: [
        { id: 'ver1', name: 'Xác minh danh tính bởi Viet-Kultura', status: 'Verified', verificationDate: '2024-01-10' },
        { id: 'ver2', name: 'Xác minh kinh nghiệm làm việc', status: 'Pending' },
      ]
    }), 300);
  });
};

export const getClassSchedules = async (): Promise<ClassSchedule[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 'class1', name: 'Advanced React Patterns', type: 'online', date: '2024-08-05', time: '18:00', platformOrLocation: 'Zoom (Link in email)', status: 'upcoming' },
            { id: 'class2', name: 'Negotiation Skills Workshop', type: 'offline', date: '2024-08-10', time: '09:00', platformOrLocation: 'Viet-Kultura Office, HCMC', status: 'upcoming' },
            { id: 'class3', name: 'Introduction to AI for Business', type: 'online', date: '2024-07-20', time: '14:00', platformOrLocation: 'Google Meet', status: 'in-progress', progress: 60 },
            { id: 'class4', name: 'Data Structures & Algorithms', type: 'online', date: '2024-06-30', time: '10:00', platformOrLocation: 'Platform X', status: 'completed', progress: 100 },
        ]), 300);
    });
};

export const getCompanyListings = async (): Promise<{
  verified: CompanyListingDetails[];
  unverified: CompanyListingDetails[];
  invited: CompanyListingDetails[];
}> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      verified: [
        { 
          id: 'compv1', name: 'FinTech Innovators', logoUrl: `https://via.placeholder.com/60/17a2b8/ffffff?text=FI`,
          founders: ['Jane Doe', 'John Smith'], cLevel: ['CEO: Jane Doe', 'CTO: Alex Green'], keyMembers: ['Lead Dev: Sarah Lee'],
          esopPolicy: 'Available, 5% pool', isopPolicy: 'Details upon request', fundingStage: 'Series A', capitalRaised: '$5M',
          investors: ['Future Ventures', 'Growth Capital Partners'],
          companyDescription: 'Revolutionizing financial services with AI-driven solutions. Looking for passionate engineers and product managers.',
          aiPrediction: 'High growth potential in the next 2 years. Strong leadership team.',
          latestNews: [{ title: 'FinTech Innovators secures $5M Series A', source: 'TechCrunch', date: '2024-07-15', url:'#' }],
          scores: { trust: 92, growth: 88, heat: 75 }, isVerified: true,
        },
      ],
      unverified: [
        { 
          id: 'compu1', name: 'Eco Sustainables', logoUrl: `https://via.placeholder.com/60/fd7e14/ffffff?text=ES`,
          founders: ['Mike Brown'], cLevel: [], keyMembers: [],
          companyDescription: 'Developing eco-friendly packaging solutions. Early stage, seeking seed funding.',
          scores: { trust: 60, growth: 70, heat: 50 }, isVerified: false,
        },
      ],
      invited: [
        { 
          id: 'compi1', name: 'HealthAI Corp', logoUrl: `https://via.placeholder.com/60/6f42c1/ffffff?text=HA`,
          founders: ['Dr. Emily Carter'], cLevel: ['CEO: Dr. Emily Carter'], keyMembers: [],
          esopPolicy: 'Generous ESOP for early hires', fundingStage: 'Seed', capitalRaised: '$500K',
          companyDescription: 'Using AI to improve patient diagnostics. We have invited you to consider a Lead AI Researcher role.',
          scores: { trust: 85, growth: 90, heat: 80 }, isVerified: true, status: 'invited'
        },
      ]
    }), 500);
  });
};