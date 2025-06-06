export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  credits: number;
  membership: UserMembershipType; // Renamed from MembershipType
  isAdmin?: boolean;
  phone?: string;
  isWorker?: boolean; // Added for worker users
  membershipPlanName?: string; // e.g., "Nâng Cao", "Worker Professional"
  membershipRoleType?: 'user' | 'worker' | 'admin'; // To distinguish plan types
}

// Membership types for regular users
export enum UserMembershipType {
  Free = 'Free',
  Advanced = 'Advanced',
  Professional = 'Professional'
}

// Membership types for workers
export enum WorkerMembershipType {
  WorkerAdvanced = 'WorkerAdvanced', // e.g., 599k plan
  WorkerProfessional = 'WorkerProfessional' // e.g., 1.599M plan
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'fundraising' | 'businessModel' | 'legal'; // Added legal for legal consultation
}

export interface GuidelineContent {
  title: string;
  points: string[];
}

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  cvUrl?: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  type: string; // e.g., 'Contract', 'NDA'
  uploadDate: string;
  score?: number;
  issues?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Props for common components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  as?: React.ElementType;
  // Add Link-specific props as optional:
  to?: string;
  // For 'a' tags and other relevant props when 'as' is used
  href?: string;
  target?: string;
  rel?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export type IconProps = Omit<React.ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> & {
  size?: number | string;
  title?: string; // Added for tooltips/accessibility
};

// Admin specific types
export interface AdminOverviewStats {
  totalActiveUsers: number;
  totalCreditsUsed: number;
  totalRevenueFromCredits: number;
  totalRevenueFromMemberships: number;
  recentChatSnippets: { user: string, snippet: string, timestamp: Date }[];
  aiSuggestions: string[];
}

export interface GeneratedCode {
  id: string;
  code: string;
  type: 'membership' | 'coupon';
  details: string;
  isUsed: boolean;
  createdAt: Date;
}

// Worker specific types
export interface CompanyView {
  id: string;
  name: string;
  logoUrl: string;
  viewDate: string;
}

export interface WorkerScores {
  trust: number;
  heating: number;
  growth: number;
}

export interface WorkerCertificateDetails {
  id: string;
  name: string;
  issuer: string; // e.g., "viet-kultura.com"
  issueDate: string;
  isVerified: boolean; // e.g., blockchain verified
  url?: string;
}

export interface ClassSchedule {
  id: string;
  name: string;
  type: 'online' | 'offline';
  date: string;
  time: string;
  platformOrLocation: string; // Zoom link or physical address
  status: 'upcoming' | 'in-progress' | 'completed';
  progress?: number; // 0-100 for in-progress classes
}

export interface CompanyListingDetails {
  id: string;
  name: string;
  logoUrl: string;
  founders: string[];
  cLevel: string[];
  keyMembers: string[];
  esopPolicy?: string; // "Available", "Details upon request", "N/A"
  isopPolicy?: string;
  fundingStage?: string; // e.g., "Seed", "Series A"
  capitalRaised?: string; // e.g., "$1M"
  investors?: string[];
  companyDescription: string;
  aiPrediction?: string; // Agent AI's assessment
  latestNews?: { title: string; source: string; date: string; url: string }[];
  scores: { trust: number; growth: number; heat: number };
  isVerified: boolean;
  status?: 'invited' | 'none'; // For "Công ty đã mời bạn tham gia dự án"
}

export interface WorkerMembershipPlan {
  key: WorkerMembershipType;
  name: string;
  price: number;
  features: string[];
}