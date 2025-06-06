
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import ProfileDropdown from '../dashboard/ProfileDropdown'; // Reusing user dashboard's dropdown for simplicity
import { ShieldCheckIcon, SparklesIcon } from '../common/Icon'; // Using SparklesIcon for app name
import Button from '../common/Button';

const AdminDashboardHeader: React.FC = () => {
  return (
    <header className="bg-secondary-800 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin/overview" className="flex items-center hover:opacity-80">
              <ShieldCheckIcon className="h-8 w-8 mr-2 text-primary-400" />
              <span className="font-bold text-xl">{APP_NAME} - Admin Panel</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/overview" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="text-white border-primary-400 hover:bg-primary-500 hover:text-white">
                Preview User Dashboard
              </Button>
            </Link>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
