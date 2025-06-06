
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import ProfileDropdown from '../dashboard/ProfileDropdown'; // Reusing the same profile dropdown
import { BriefcaseIcon } from '../common/Icon'; // Worker-themed icon

const WorkerDashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/worker/overview" className="flex items-center text-primary-600 hover:text-primary-700">
              <BriefcaseIcon className="h-8 w-8 mr-2 text-primary-500" />
              <span className="font-bold text-xl text-secondary-800">{APP_NAME} - Worker</span>
            </Link>
          </div>
          <div className="flex items-center">
            {/* Placeholder for potential future quick actions or notifications specific to worker */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorkerDashboardHeader;
