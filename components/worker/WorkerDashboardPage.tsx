import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WorkerDashboardHeader from './WorkerDashboardHeader';
import WorkerDashboardSidebar, { WorkerNavItemKey } from './WorkerDashboardSidebar';
import WorkerOverviewSection from './WorkerOverviewSection';
import AIAgentInterviewSection from './AIAgentInterviewSection';
import CertificateLearningSection from './CertificateLearningSection';
import CompanyListSection from './CompanyListSection';
import WorkerProfileSettingsSection from './WorkerProfileSettingsSection'; 
import { useAuth } from '../../contexts/AuthContext';
import { ONBOARDING_COMPLETED_KEY, PRIVACY_ACCEPTED_KEY } from '../../constants';
import OnboardingModal from '../common/OnboardingModal';
import PrivacyModal from '../common/PrivacyModal';

const WorkerDashboardPage: React.FC = () => {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState<WorkerNavItemKey>('overview');

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    if (location.state && (location.state as any).section) {
      setActiveSection((location.state as any).section as WorkerNavItemKey);
    }
  }, [location.state]);

  useEffect(() => {
    if (user && !authLoading && user.isWorker) { 
      const onboardingComplete = localStorage.getItem(`${ONBOARDING_COMPLETED_KEY}_worker`) === 'true';
      const privacyAccepted = localStorage.getItem(`${PRIVACY_ACCEPTED_KEY}_worker`) === 'true';

      if (!onboardingComplete) {
        setShowOnboarding(true);
      } else if (!privacyAccepted) {
        setShowPrivacy(true);
      }
    }
  }, [user, authLoading]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(`${ONBOARDING_COMPLETED_KEY}_worker`, 'true');
    setShowOnboarding(false);
    if (localStorage.getItem(`${PRIVACY_ACCEPTED_KEY}_worker`) !== 'true') {
        setShowPrivacy(true);
    }
  };

  const handlePrivacyAccept = () => {
    localStorage.setItem(`${PRIVACY_ACCEPTED_KEY}_worker`, 'true');
    setShowPrivacy(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <WorkerOverviewSection />;
      case 'aiInterviews':
        return <AIAgentInterviewSection />;
      case 'certificates':
        return <CertificateLearningSection />;
      case 'companyListings':
        return <CompanyListSection />;
      case 'settings': 
        return <WorkerProfileSettingsSection />;
      default:
        return <WorkerOverviewSection />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-secondary-50">
      <WorkerDashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <WorkerDashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
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

export default WorkerDashboardPage;
