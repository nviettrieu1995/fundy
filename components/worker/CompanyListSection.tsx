import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { CompanyListingDetails } from '../../types';
import { getCompanyListings } from '../../services/workerDataService';
import { BuildingOffice2Icon, CheckCircleIcon, InformationCircleIcon, SparklesIcon, LightBulbIcon } from '../common/Icon';

type CompanyListTab = 'verified' | 'unverified' | 'invited';

const CompanyCard: React.FC<{ company: CompanyListingDetails, onAction?: (companyId: string, action: 'viewDetails' | 'acceptInvite') => void }> = ({ company, onAction }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow">
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <img src={company.logoUrl} alt={`${company.name} logo`} className="w-16 h-16 rounded-lg object-contain border"/>
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-primary-700">{company.name} {company.isVerified && <CheckCircleIcon className="h-5 w-5 text-green-500 inline-block ml-1" title="Verified Company"/>}</h4>
        <p className="text-sm text-secondary-600 truncate " title={company.companyDescription}>{company.companyDescription.substring(0,100)}...</p>
        <div className="text-xs text-secondary-500 mt-1">
          {company.fundingStage && <span>Stage: {company.fundingStage}</span>}
          {company.capitalRaised && <span className="ml-2">Raised: {company.capitalRaised}</span>}
        </div>
        <div className="flex items-center space-x-2 mt-1 text-xs">
            <span className={`font-semibold ${company.scores.trust > 75 ? 'text-green-600': 'text-yellow-600'}`}>Trust: {company.scores.trust}</span>
            <span className={`font-semibold ${company.scores.growth > 75 ? 'text-green-600': 'text-yellow-600'}`}>Growth: {company.scores.growth}</span>
            <span className={`font-semibold ${company.scores.heat > 75 ? 'text-orange-600': 'text-yellow-600'}`}>Heat: {company.scores.heat}</span>
        </div>
      </div>
      {onAction && (
        <div className="flex-shrink-0 self-start sm:self-center">
          {company.status === 'invited' ? (
            <Button onClick={() => onAction(company.id, 'acceptInvite')} variant="primary" size="sm">Phản Hồi Lời Mời</Button>
          ) : (
            <Button onClick={() => onAction(company.id, 'viewDetails')} variant="outline" size="sm">Xem Chi Tiết</Button>
          )}
        </div>
      )}
    </div>
    {company.aiPrediction && (
        <div className="mt-3 pt-2 border-t border-secondary-100 flex items-start text-xs text-blue-600 bg-blue-50 p-2 rounded">
            <LightBulbIcon className="h-4 w-4 mr-1.5 flex-shrink-0 text-blue-500"/>
            <strong>AI Insight:</strong> <span className="ml-1">{company.aiPrediction}</span>
        </div>
    )}
    {/* TODO: Add more details on click (founders, cLevel, esop, isop, news etc.) in a modal or expanded view */}
  </Card>
);


const CompanyListSection: React.FC = () => {
  const [listings, setListings] = useState<{
    verified: CompanyListingDetails[];
    unverified: CompanyListingDetails[];
    invited: CompanyListingDetails[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState<CompanyListTab>('verified');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCompanyListings();
      setListings(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const handleCompanyAction = (companyId: string, action: 'viewDetails' | 'acceptInvite') => {
      alert(`Action: ${action} for company ${companyId} (mock). Detailed view/modal TBD.`);
  };

  if (loading || !listings) {
    return <LoadingSpinner message="Loading company listings..." />;
  }
  
  const currentList = listings[activeTab];

  return (
    <Card title="Danh Sách Công Ty">
      <div className="mb-4 border-b border-secondary-200">
        <nav className="flex space-x-1 -mb-px">
          {(['verified', 'unverified', 'invited'] as CompanyListTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 font-medium text-sm rounded-t-md
                ${activeTab === tab 
                  ? 'border-primary-500 text-primary-600 border-b-2' 
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
            >
              {tab === 'verified' && 'Công ty xác minh'}
              {tab === 'unverified' && 'Công ty chưa xác minh'}
              {tab === 'invited' && 'Công ty đã mời bạn'}
               <span className="ml-1 bg-secondary-200 text-secondary-600 text-xs px-1.5 py-0.5 rounded-full">{listings[tab].length}</span>
            </button>
          ))}
        </nav>
      </div>

      {currentList.length > 0 ? (
        <div className="max-h-[calc(100vh-20rem)] overflow-y-auto pr-2"> {/* Adjust max-h as needed */}
          {currentList.map(company => (
            <CompanyCard key={company.id} company={company} onAction={handleCompanyAction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <BuildingOffice2Icon className="h-12 w-12 text-secondary-300 mx-auto mb-2"/>
          <p className="text-secondary-500">Không có công ty nào trong danh mục này.</p>
        </div>
      )}
      <p className="text-xs text-secondary-500 mt-6">
        Thông tin công ty được cung cấp mang tính chất tham khảo (dữ liệu mô phỏng).
        Click vào công ty để xem thông tin chi tiết (ESOP/ISOP, Founders, C-level, etc. - tính năng đang phát triển).
      </p>
    </Card>
  );
};

export default CompanyListSection;