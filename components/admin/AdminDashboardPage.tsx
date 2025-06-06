
import React, { useState, useEffect } from 'react';
import AdminDashboardHeader from './AdminDashboardHeader';
import AdminDashboardSidebar, { AdminNavItemKey } from './AdminDashboardSidebar';
import AdminOverviewSection from './AdminOverviewSection';
import UserManagementSection from './UserManagementSection';
import MembershipCreditManagementSection from './MembershipCreditManagementSection';
import CodeManagementSection from './CodeManagementSection';
import AIAgentManagementSection from './AIAgentManagementSection'; 
import { useAuth } from '../../contexts/AuthContext';
import { ONBOARDING_COMPLETED_KEY, PRIVACY_ACCEPTED_KEY } from '../../constants';
import OnboardingModal from '../common/OnboardingModal'; // Assuming admin might see a generic onboarding
import PrivacyModal from '../common/PrivacyModal';     // Assuming admin might see a generic privacy agreement

const AdminDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminNavItemKey>('overview');
  const { user, loading: authLoading } = useAuth();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    if (user && !authLoading && user.isAdmin) { 
      const onboardingComplete = localStorage.getItem(`${ONBOARDING_COMPLETED_KEY}_admin`) === 'true';
      const privacyAccepted = localStorage.getItem(`${PRIVACY_ACCEPTED_KEY}_admin`) === 'true';

      if (!onboardingComplete) {
        setShowOnboarding(true);
      } else if (!privacyAccepted) {
        setShowPrivacy(true);
      }
    }
  }, [user, authLoading]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(`${ONBOARDING_COMPLETED_KEY}_admin`, 'true');
    setShowOnboarding(false);
    if (localStorage.getItem(`${PRIVACY_ACCEPTED_KEY}_admin`) !== 'true') {
        setShowPrivacy(true);
    }
  };

  const handlePrivacyAccept = () => {
    localStorage.setItem(`${PRIVACY_ACCEPTED_KEY}_admin`, 'true');
    setShowPrivacy(false);
  };


  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverviewSection />;
      case 'userManagement':
        return <UserManagementSection />;
      case 'membershipCreditManagement':
        return <MembershipCreditManagementSection />;
      case 'codeManagement':
        return <CodeManagementSection />;
      case 'aiAgentManagement':
        return <AIAgentManagementSection />;
      default:
        return <AdminOverviewSection />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-secondary-50">
      <AdminDashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminDashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
      {/* Admin specific onboarding/privacy or a generic one */}
      {showOnboarding && (
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={handleOnboardingComplete}
        />
      )}
      {showPrivacy && (
        <PrivacyModal
          isOpen={showPrivacy}
          onAccept={handlePrivacyAccept}
          onClose={() => setShowPrivacy(false)} 
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
