import React from 'react';
import { HomeIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, DocumentTextIcon, BriefcaseIcon, ScaleIcon, SparklesIcon, CogIcon } from '../common/Icon';
import { IconProps } from '../../types'; // Import IconProps

export type NavItemKey = 'overview' | 'chatHistory' | 'checklists' | 'guidelines' | 'talent' | 'legal' | 'virtualAssistant' | 'settings';

interface NavItem {
  key: NavItemKey;
  label: string;
  icon: React.FC<IconProps>; 
}

const navItems: NavItem[] = [
  { key: 'overview', label: 'Tổng quan', icon: HomeIcon },
  { key: 'chatHistory', label: 'Lịch sử trò chuyện', icon: ChatBubbleLeftRightIcon },
  { key: 'checklists', label: 'Checklists', icon: CheckCircleIcon },
  { key: 'guidelines', label: 'Guideline Doanh Nghiệp', icon: DocumentTextIcon },
  { key: 'talent', label: 'Tìm Nhân Tài', icon: BriefcaseIcon },
  { key: 'legal', label: 'Tư Vấn Pháp Lý', icon: ScaleIcon },
  { key: 'virtualAssistant', label: 'Tạo Trợ Lý Ảo', icon: SparklesIcon },
  // { key: 'settings', label: 'Cài đặt cá nhân', icon: CogIcon }, // Moved to ProfileDropdown
];

interface DashboardSidebarProps {
  activeSection: NavItemKey;
  setActiveSection: (section: NavItemKey) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-64 bg-white shadow-lg p-4 space-y-2 overflow-y-auto">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${activeSection === item.key 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
              >
                <item.icon className={`h-5 w-5 ${activeSection === item.key ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-500'}`} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;