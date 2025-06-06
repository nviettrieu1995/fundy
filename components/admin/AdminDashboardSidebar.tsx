
import React from 'react';
import { ChartBarIcon, UsersIcon, CreditCardIcon, TagIcon, SparklesIcon as AIAgentIcon, CogIcon } from '../common/Icon';
import { IconProps } from '../../types';

export type AdminNavItemKey = 
  | 'overview' 
  | 'userManagement' 
  | 'membershipCreditManagement' 
  | 'codeManagement' 
  | 'aiAgentManagement'
  | 'systemSettings'; // Future placeholder

interface AdminNavItem {
  key: AdminNavItemKey;
  label: string;
  icon: React.FC<IconProps>;
}

const navItems: AdminNavItem[] = [
  { key: 'overview', label: 'Tổng Quan Admin', icon: ChartBarIcon },
  { key: 'userManagement', label: 'Quản Lý Người Dùng', icon: UsersIcon },
  { key: 'membershipCreditManagement', label: 'Quản Lý Membership & Credit', icon: CreditCardIcon },
  { key: 'codeManagement', label: 'Quản Lý Code Ưu Đãi', icon: TagIcon },
  { key: 'aiAgentManagement', label: 'Quản Lý Agent AI', icon: AIAgentIcon },
  // { key: 'systemSettings', label: 'Cài Đặt Hệ Thống', icon: CogIcon }, // Example for future
];

interface AdminDashboardSidebarProps {
  activeSection: AdminNavItemKey;
  setActiveSection: (section: AdminNavItemKey) => void;
}

const AdminDashboardSidebar: React.FC<AdminDashboardSidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-72 bg-secondary-700 text-secondary-200 shadow-lg p-4 space-y-2 overflow-y-auto">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group
                  ${activeSection === item.key 
                    ? 'bg-primary-500 text-white' 
                    : 'hover:bg-secondary-600 hover:text-white'
                  }`}
              >
                <item.icon 
                    className={`h-5 w-5 ${activeSection === item.key ? 'text-white' : 'text-secondary-400 group-hover:text-secondary-200'}`} 
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

export default AdminDashboardSidebar;
