import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircleIcon, CogIcon, CreditCardIcon, ArrowUpTrayIcon as UpgradeIcon, LogoutIcon } from '../common/Icon';
import { DEFAULT_AVATAR_URL, USER_MEMBERSHIP_PLANS, WORKER_MEMBERSHIP_PLANS } from '../../constants';
import CreditModal from './CreditModal';
import MembershipModal from './MembershipModal'; // User membership modal
import WorkerMembershipModal from '../worker/WorkerMembershipModal'; // Worker membership modal
import { useNavigate } from 'react-router-dom';
import { UserMembershipType, WorkerMembershipType } from '../../types';

const ProfileDropdown: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isUserMembershipModalOpen, setIsUserMembershipModalOpen] = useState(false);
  const [isWorkerMembershipModalOpen, setIsWorkerMembershipModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const handleAddCreditsSuccess = (_amount: number) => {
    // State updated in AuthContext
  };

  const handleUpgradeUserMembershipSuccess = (_newMembershipPlanKey: UserMembershipType) => {
    // State updated in AuthContext
  };

  const handleUpgradeWorkerMembershipSuccess = (newMembershipPlanKey: WorkerMembershipType) => {
     const planDetails = WORKER_MEMBERSHIP_PLANS[newMembershipPlanKey];
     if (planDetails) {
        updateUser({ membershipPlanName: planDetails.name }); 
        // `membership` enum might not directly apply or needs adjustment for worker plans
     }
  };

  const openRelevantMembershipModal = () => {
    if (user.isWorker) {
      setIsWorkerMembershipModalOpen(true);
    } else if (!user.isAdmin) { // Regular users
      setIsUserMembershipModalOpen(true);
    }
    // Admins typically don't upgrade their own "membership" via this UI.
    setIsOpen(false);
  };
  
  const canManageCredits = !user.isAdmin; // Admins don't buy credits for themselves this way
  const canUpgradeMembership = !user.isAdmin; // Admins don't upgrade this way

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user.avatarUrl || DEFAULT_AVATAR_URL}
          alt={user.name}
        />
        <span className="ml-2 text-secondary-700 font-medium hidden md:block">{user.name}</span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
          <div className="px-4 py-3">
            <p className="text-sm text-secondary-700">Signed in as</p>
            <p className="text-sm font-medium text-secondary-900 truncate">{user.email}</p>
            {user.membershipPlanName && (
              <p className="text-xs text-primary-600">{user.membershipPlanName}</p>
            )}
          </div>
          <div className="border-t border-secondary-200"></div>
          <button
            onClick={() => { 
              if (user.isAdmin) navigate('/admin/overview', {state: { section: 'systemSettings'}}); // Placeholder for admin settings
              else if (user.isWorker) navigate('/worker/overview', {state: { section: 'settings'}}); // Navigate to worker settings
              else navigate('/dashboard/overview', {state: { section: 'settings'}}); // Navigate to user settings
              setIsOpen(false); 
            }}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
          >
            <CogIcon className="mr-3 h-5 w-5 text-secondary-400" />
            Cài Đặt Cá Nhân
          </button>
          
          {canManageCredits && (
            <>
              <div className="px-4 py-2 text-sm text-secondary-700">
                Số dư credit: <span className="font-semibold">{user.credits}</span>
              </div>
              <button
                onClick={() => { setIsCreditModalOpen(true); setIsOpen(false); }}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
              >
                <CreditCardIcon className="mr-3 h-5 w-5 text-secondary-400" />
                + Thêm credit
              </button>
            </>
          )}

          {canUpgradeMembership && (
            <button
              onClick={openRelevantMembershipModal}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
            >
              <UpgradeIcon className="mr-3 h-5 w-5 text-secondary-400" />
              Nâng cấp membership
            </button>
          )}

          <div className="border-t border-secondary-200"></div>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
          >
            <LogoutIcon className="mr-3 h-5 w-5 text-secondary-400" />
            Đăng xuất
          </button>
        </div>
      )}

      {/* Modals */}
      {canManageCredits && 
        <CreditModal 
          isOpen={isCreditModalOpen} 
          onClose={() => setIsCreditModalOpen(false)}
          onPaymentSuccess={handleAddCreditsSuccess} 
        />
      }
      {/* User Membership Modal (only for non-worker, non-admin users) */}
      {user && !user.isWorker && !user.isAdmin &&
        <MembershipModal 
          isOpen={isUserMembershipModalOpen} 
          onClose={() => setIsUserMembershipModalOpen(false)}
          onPaymentSuccess={handleUpgradeUserMembershipSuccess}
        />
      }
      {/* Worker Membership Modal (only for worker users) */}
      {user && user.isWorker &&
        <WorkerMembershipModal
          isOpen={isWorkerMembershipModalOpen}
          onClose={() => setIsWorkerMembershipModalOpen(false)}
          onPaymentSuccess={handleUpgradeWorkerMembershipSuccess}
        />
      }
    </div>
  );
};

export default ProfileDropdown;