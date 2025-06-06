import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar, { NavItemKey } from './DashboardSidebar';
import DashboardOverviewSection from './DashboardOverviewSection'; 
import ChatHistorySection from './ChatHistorySection';
import ChecklistSection from './ChecklistSection';
import GuidelineSection from './GuidelineSection';
import TalentSection from './TalentSection';
import LegalConsultationSection from './LegalConsultationSection';
import VirtualAssistantSection from './VirtualAssistantSection';
import ProfileSettingsSection from './ProfileSettingsSection'; 
import { useLocation } from 'react-router-dom';
import { ONBOARDING_COMPLETED_KEY, PRIVACY_ACCEPTED_KEY } from '../../constants';
import OnboardingModal from '../common/OnboardingModal';
import PrivacyModal from '../common/PrivacyModal';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboardPage: React.FC = () => {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState<NavItemKey>('overview'); 

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);


  useEffect(() => {
    // Allow navigation to a specific section via state (e.g., from ProfileDropdown)
    if (location.state && (location.state as any).section) {
      setActiveSection((location.state as any).section as NavItemKey);
    }
  }, [location.state]);

  useEffect(() => {
    if (user && !authLoading) { // Ensure user is loaded
      const onboardingComplete = localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
      const privacyAccepted = localStorage.getItem(PRIVACY_ACCEPTED_KEY) === 'true';

      if (!onboardingComplete) {
        setShowOnboarding(true);
      } else if (!privacyAccepted) {
        setShowPrivacy(true);
      }
    }
  }, [user, authLoading]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    setShowOnboarding(false);
    if (localStorage.getItem(PRIVACY_ACCEPTED_KEY) !== 'true') {
        setShowPrivacy(true);
    }
  };

  const handlePrivacyAccept = () => {
    localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'true');
    setShowPrivacy(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverviewSection setActiveSection={setActiveSection} />;
      case 'chatHistory':
        return <ChatHistorySection />;
      case 'checklists':
        return <ChecklistSection />;
      case 'guidelines':
        return <GuidelineSection />;
      case 'talent':
        return <TalentSection />;
      case 'legal':
        return <LegalConsultationSection />;
      case 'virtualAssistant':
        return <VirtualAssistantSection />;
      case 'settings': 
        return <ProfileSettingsSection />;
      default:
        return <DashboardOverviewSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-6 overflow-y-auto bg-secondary-100">
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

export default UserDashboardPage;
