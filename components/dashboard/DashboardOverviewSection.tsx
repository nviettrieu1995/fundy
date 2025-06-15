
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { UserCircleIcon, CreditCardIcon, ArrowUpTrayIcon as UpgradeIcon, CheckCircleIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, BriefcaseIcon, ScaleIcon, SparklesIcon } from '../common/Icon';
import CreditModal from './CreditModal';
import MembershipModal from './MembershipModal';
import { NavItemKey } from './DashboardSidebar';
import { APP_NAME, USER_MEMBERSHIP_PLANS } from '../../constants'; // Added USER_MEMBERSHIP_PLANS

interface DashboardOverviewSectionProps {
  setActiveSection: (section: NavItemKey) => void;
}

const DashboardOverviewSection: React.FC<DashboardOverviewSectionProps> = ({ setActiveSection }) => {
  const { user, updateUser } = useAuth();
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);

  if (!user) {
    return <LoadingSpinner message="Loading user data..." />;
  }

  const handleAddCreditsSuccess = (_amount: number) => {
    // User state is updated in AuthContext
  };

  const handleUpgradeMembershipSuccess = (_newMembershipPlanKey: any) => {
    // User state updated in AuthContext
  };

  const handleAskAssistant = () => {
    // This is a placeholder. In a real app, this would likely open or focus the AIAgentWidget.
    // For now, we can simulate this by trying to toggle the widget if a global toggle function existed.
    // Or, if AIAgentWidget handles its own visibility via a button, this button might not be needed here.
    // Let's assume the AIAgentWidget's cog button is the primary way to open it.
    // This button could scroll to it or provide a hint.
    alert(`Vui lòng sử dụng nút ${APP_NAME} AI Agent (hình bánh răng) ở góc dưới để tương tác với trợ lý.`);
  };

  const handleFindRecords = () => {
    alert(`Tính năng "Tìm Hồ Sơ" đang được phát triển. Nó sẽ giúp bạn nhanh chóng tìm lại các tài liệu, checklist, hoặc ghi chú quan trọng trong ${APP_NAME}.`);
  };


  // Mock data for activity summary
  const activityStats = {
    checklistsInProgress: 3,
    aiConversations: 12,
    documentsAnalyzed: 5,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary-800">Chào mừng trở lại {APP_NAME}, {user.name}!</h1>
      
      {/* New Quick Action Buttons */}
      <div className="flex space-x-4 mb-6">
          <Button onClick={handleAskAssistant} variant="primary" size="md">
              <SparklesIcon className="h-5 w-5 mr-2" /> Hỏi Trợ Lý {APP_NAME}
          </Button>
          <Button onClick={handleFindRecords} variant="secondary" size="md">
              <DocumentTextIcon className="h-5 w-5 mr-2" /> Tìm Hồ Sơ
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Summary Card */}
        <Card title="Tóm tắt tài khoản" className="lg:col-span-1">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="h-10 w-10 text-primary-500" />
              <div>
                <p className="text-sm font-medium text-secondary-800">{user.name}</p>
                <p className="text-xs text-secondary-600">{user.email}</p>
              </div>
            </div>
            <p className="text-sm">
              Credits: <span className="font-semibold text-primary-600">{user.credits}</span>
            </p>
            <p className="text-sm">
              Gói Membership: <span className="font-semibold text-primary-600">{user.membershipPlanName || user.membership}</span>
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-secondary-200 space-y-2">
            <Button onClick={() => setIsCreditModalOpen(true)} variant="primary" size="sm" className="w-full">
              <CreditCardIcon className="h-4 w-4 mr-2" /> Thêm Credit
            </Button>
            <Button onClick={() => setIsMembershipModalOpen(true)} variant="outline" size="sm" className="w-full">
              <UpgradeIcon className="h-4 w-4 mr-2" /> Nâng Cấp Gói
            </Button>
          </div>
        </Card>

        {/* Activity Summary Card */}
        <Card title="Hoạt động gần đây" className="lg:col-span-1">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              Checklists đang thực hiện: <span className="font-semibold ml-1">{activityStats.checklistsInProgress}</span>
            </li>
            <li className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-500 mr-2" />
              Cuộc trò chuyện AI (tháng): <span className="font-semibold ml-1">{activityStats.aiConversations}</span>
            </li>
            <li className="flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-purple-500 mr-2" />
              Tài liệu đã phân tích: <span className="font-semibold ml-1">{activityStats.documentsAnalyzed}</span>
            </li>
          </ul>
           <p className="text-xs text-secondary-500 mt-4">Dữ liệu hoạt động được mô phỏng cho mục đích demo.</p>
        </Card>
        
        {/* Quick Links Card */}
        <Card title="Truy cập nhanh" className="lg:col-span-1">
          <div className="space-y-2">
            <Button onClick={() => setActiveSection('checklists')} variant="secondary" className="w-full justify-start text-left">
              <CheckCircleIcon className="h-5 w-5 mr-3" /> Quản lý Checklists
            </Button>
            <Button onClick={() => setActiveSection('guidelines')} variant="secondary" className="w-full justify-start text-left">
              <DocumentTextIcon className="h-5 w-5 mr-3" /> Xem Guideline Doanh Nghiệp
            </Button>
            <Button onClick={() => setActiveSection('talent')} variant="secondary" className="w-full justify-start text-left">
              <BriefcaseIcon className="h-5 w-5 mr-3" /> Tìm kiếm Nhân Tài
            </Button>
             <Button onClick={() => setActiveSection('legal')} variant="secondary" className="w-full justify-start text-left">
              <ScaleIcon className="h-5 w-5 mr-3" /> Tư Vấn Pháp Lý
            </Button>
          </div>
        </Card>
      </div>

      <CreditModal 
        isOpen={isCreditModalOpen} 
        onClose={() => setIsCreditModalOpen(false)}
        onPaymentSuccess={handleAddCreditsSuccess} 
      />
      <MembershipModal 
        isOpen={isMembershipModalOpen} 
        onClose={() => setIsMembershipModalOpen(false)}
        onPaymentSuccess={handleUpgradeMembershipSuccess}
      />
    </div>
  );
};

export default DashboardOverviewSection;

// Basic Loading Spinner (can be replaced with a more sophisticated one if available)
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center h-64">
    <svg className="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-2 text-secondary-600">{message}</p>
  </div>
);