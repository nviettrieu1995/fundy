
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { AdminOverviewStats } from '../../types';
import { getAdminOverviewStats } from '../../services/adminDataService';
import { UsersIcon, CreditCardIcon, ChartBarIcon, ChatBubbleLeftRightIcon, SparklesIcon } from '../common/Icon';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.FC<any>; colorClass: string }> = ({ title, value, icon: Icon, colorClass }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-20 mr-4`}>
        <Icon className={`h-6 w-6 ${colorClass}`} />
      </div>
      <div>
        <p className="text-sm text-secondary-600">{title}</p>
        <p className="text-2xl font-bold text-secondary-800">{typeof value === 'number' ? value.toLocaleString('vi-VN') : value}</p>
      </div>
    </div>
  </Card>
);

const AdminOverviewSection: React.FC = () => {
  const [stats, setStats] = useState<AdminOverviewStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await getAdminOverviewStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return <LoadingSpinner message="Loading admin overview..." />;
  }
  
  const formatCurrency = (amount: number) => `${amount.toLocaleString('vi-VN')} VND`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-secondary-800">Admin Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Active Users" value={stats.totalActiveUsers} icon={UsersIcon} colorClass="text-blue-500" />
        <StatCard title="Total Credits Used" value={stats.totalCreditsUsed} icon={CreditCardIcon} colorClass="text-green-500" />
        <StatCard title="Revenue (Credits)" value={formatCurrency(stats.totalRevenueFromCredits)} icon={ChartBarIcon} colorClass="text-purple-500" />
        <StatCard title="Revenue (Memberships)" value={formatCurrency(stats.totalRevenueFromMemberships)} icon={ChartBarIcon} colorClass="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Chat Snippets */}
        <Card title="Recent Chat Activity (Snippets)">
          {stats.recentChatSnippets.length > 0 ? (
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {stats.recentChatSnippets.map((chat, index) => (
                <li key={index} className="p-3 bg-secondary-100 rounded-md">
                  <p className="text-xs text-secondary-500">{chat.user} - {new Date(chat.timestamp).toLocaleString()}</p>
                  <p className="text-sm text-secondary-700 italic">"{chat.snippet}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-secondary-600">No recent chat activity to display.</p>
          )}
           <p className="text-xs text-secondary-500 mt-2">Full chat history accessible via User Management or dedicated logs (feature placeholder).</p>
        </Card>

        {/* AI Suggestions */}
        <Card title="AI Agent Suggestions for Platform Improvement">
          {stats.aiSuggestions.length > 0 ? (
            <ul className="space-y-2">
              {stats.aiSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start p-2 bg-blue-50 rounded-md">
                  <SparklesIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700">{suggestion}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-secondary-600">No AI suggestions at this time.</p>
          )}
        </Card>
      </div>
       <p className="text-xs text-secondary-500 text-center mt-4">All data shown is for demonstration purposes (mock data).</p>
    </div>
  );
};

export default AdminOverviewSection;
