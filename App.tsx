import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import UserDashboardPage from './components/dashboard/UserDashboardPage';
import AIAgentWidget from './components/widgets/AIAgentWidget';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import WorkerDashboardPage from './components/worker/WorkerDashboardPage';

import MarketingLayout from './components/marketing/MarketingLayout';
import MarketingHomePage from './components/marketing/pages/MarketingHomePage';
import MarketingAboutPage from './components/marketing/pages/MarketingAboutPage';
import MarketingProductsPage from './components/marketing/pages/MarketingProductsPage';
import MarketingPricingPage from './components/marketing/pages/MarketingPricingPage';
import MarketingContactPage from './components/marketing/pages/MarketingContactPage';

import OnboardingModal from './components/common/OnboardingModal';
import PrivacyModal from './components/common/PrivacyModal';
import FeedbackButton from './components/common/FeedbackButton';
import { ONBOARDING_COMPLETED_KEY, PRIVACY_ACCEPTED_KEY } from './constants';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      const onboardingComplete = localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
      const privacyAccepted = localStorage.getItem(PRIVACY_ACCEPTED_KEY) === 'true';

      if (!onboardingComplete) {
        setShowOnboarding(true);
      } else if (!privacyAccepted) {
        // Show privacy modal only if onboarding is complete and privacy not accepted
        setShowPrivacy(true);
      }
    }
  }, [user, loading]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    setShowOnboarding(false);
    // After onboarding, check if privacy needs to be shown
    if (localStorage.getItem(PRIVACY_ACCEPTED_KEY) !== 'true') {
        setShowPrivacy(true);
    }
  };

  const handlePrivacyAccept = () => {
    localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'true');
    setShowPrivacy(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading Fundy...</p></div>;
  }

  const getRedirectPath = () => {
    if (!user) return "/marketing/home"; // Default to marketing home if not logged in
    if (user.isAdmin) return "/admin/overview";
    if (user.isWorker) return "/worker/overview";
    return "/dashboard/overview";
  };
  
  // Determine if current path is a marketing path
  const isMarketingPath = location.pathname.startsWith('/marketing') || location.pathname === '/';


  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Marketing Pages */}
        <Route path="/marketing" element={<MarketingLayout />}>
          <Route path="home" element={<MarketingHomePage />} />
          <Route path="about" element={<MarketingAboutPage />} />
          <Route path="products-services" element={<MarketingProductsPage />} />
          <Route path="pricing" element={<MarketingPricingPage />} />
          <Route path="contact" element={<MarketingContactPage />} />
        </Route>

        {/* Auth Pages */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={getRedirectPath()} />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={getRedirectPath()} />} />
        <Route path="/forgot-password" element={!user ? <ForgotPasswordPage /> : <Navigate to={getRedirectPath()} />} />
        
        {/* User Dashboard Route */}
        <Route 
          path="/dashboard/*" 
          element={user && !user.isAdmin && !user.isWorker ? <UserDashboardPage /> : <Navigate to="/login" />} 
        />

        {/* Admin Dashboard Route */}
        <Route 
          path="/admin/*" 
          element={user && user.isAdmin ? <AdminDashboardPage /> : <Navigate to="/login" />} 
        />

        {/* Worker Dashboard Route */}
        <Route 
          path="/worker/*" 
          element={user && user.isWorker ? <WorkerDashboardPage /> : <Navigate to="/login" />} 
        />
        
        {/* Default Redirect */}
        {/* If at root and not logged in, redirect to marketing home. If logged in, redirect to appropriate dashboard. */}
        <Route 
            path="/" 
            element={<Navigate to={getRedirectPath()} />} 
        />
        <Route 
            path="*" 
            element={<Navigate to={getRedirectPath()} />} // Catch-all, consider a 404 page later
        />
      </Routes>
      
      {/* Modals and Global Widgets */}
      {user && !user.isAdmin && !user.isWorker && !isMarketingPath && <AIAgentWidget />} 
      {user && !isMarketingPath && <FeedbackButton />}

      {showOnboarding && user && !isMarketingPath && (
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={handleOnboardingComplete}
        />
      )}
      {showPrivacy && user && !isMarketingPath && (
        <PrivacyModal
          isOpen={showPrivacy}
          onAccept={handlePrivacyAccept}
          onClose={() => setShowPrivacy(false)} // Allow closing without accepting for now, though ideally acceptance is required
        />
      )}
    </div>
  );
};

export default App;
