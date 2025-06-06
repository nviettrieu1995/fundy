import React from 'react';
import { HomeIcon, SparklesIcon, AcademicCapIcon, BuildingOffice2Icon, CogIcon } from '../common/Icon';
import { IconProps } from '../../types';

export type WorkerNavItemKey = 
  | 'overview' 
  | 'aiInterviews' 
  | 'certificates' 
  | 'companyListings'
  | 'settings';

interface WorkerNavItem {
  key: WorkerNavItemKey;
  label: string;
  icon: React.FC<IconProps>; 
}

const navItems: WorkerNavItem[] = [
  { key: 'overview', label: 'Tổng quan Worker', icon: HomeIcon },
  { key: 'aiInterviews', label: 'Phỏng Vấn AI', icon: SparklesIcon },
  { key: 'certificates', label: 'Học Chứng Chỉ', icon: AcademicCapIcon },
  { key: 'companyListings', label: 'Danh Sách Công Ty', icon: BuildingOffice2Icon },
  // 'settings' is usually handled by ProfileDropdown, but can be a dedicated page too.
  // { key: 'settings', label: 'Cài đặt cá nhân', icon: CogIcon }, 
];

interface WorkerDashboardSidebarProps {
  activeSection: WorkerNavItemKey;
  setActiveSection: (section: WorkerNavItemKey) => void;
}

const WorkerDashboardSidebar: React.FC<WorkerDashboardSidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-64 bg-white shadow-lg p-4 space-y-2 overflow-y-auto">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group
                  ${activeSection === item.key 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
              >
                <item.icon 
                    className={`h-5 w-5 ${activeSection === item.key ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-500'}`} 
                />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default WorkerDashboardSidebar;