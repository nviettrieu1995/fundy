
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import ProfileDropdown from './ProfileDropdown';
import { SparklesIcon } from '../common/Icon';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard/overview" className="flex items-center text-primary-600 hover:text-primary-700">
              <SparklesIcon className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl text-secondary-800">{APP_NAME}</span>
            </Link>
          </div>
          <div className="flex items-center">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
