
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { TalentProfile } from '../../types';
import { getTalentProfiles } from '../../services/dataService';
import { UserCircleIcon, ArrowUpTrayIcon, SparklesIcon } from '../common/Icon';

interface TalentColumnProps {
  title: string;
  talents: TalentProfile[];
  onAction?: (talentId: string, action: 'invite' | 'save' | 'view') => void;
  actionLabel?: string;
}

const TalentColumn: React.FC<TalentColumnProps> = ({ title, talents, onAction, actionLabel }) => (
  <div className="w-full md:w-1/3 p-2">
    <h3 className="text-lg font-semibold text-secondary-700 mb-3">{title} ({talents.length})</h3>
    {talents.length === 0 ? <p className="text-sm text-secondary-500">Không có ứng viên.</p> : (
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {talents.map(talent => (
          <Card key={talent.id} className="bg-secondary-50">
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="h-10 w-10 text-secondary-400" />
              <div>
                <p className="font-semibold text-secondary-800">{talent.name}</p>
                <p className="text-xs text-secondary-600">{talent.role}</p>
                <p className="text-xs text-primary-600">Match: {talent.matchScore}%</p>
              </div>
            </div>
            {onAction && actionLabel && (
              <div className="mt-2">
                <Button onClick={() => onAction(talent.id, 'view')} size="sm" variant="outline" className="w-full">
                  {actionLabel}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    )}
  </div>
);

const TalentSection: React.FC = () => {
  const [talentData, setTalentData] = useState<{ suitable: TalentProfile[], invited: TalentProfile[], saved: TalentProfile[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInProgressMessage, setShowInProgressMessage] = useState(false);

  const fetchTalents = useCallback(async () => {
    setLoading(true);
    const data = await getTalentProfiles();
    setTalentData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTalents();
  }, [fetchTalents]);

  const handleFeatureClick = () => {
    setShowInProgressMessage(true);
    setTimeout(() => setShowInProgressMessage(false), 3000); // Hide message after 3 seconds
  };
  
  const handleTalentAction = (talentId: string, action: 'invite' | 'save' | 'view') => {
    alert(`Hành động "${action}" với nhân tài "${talentId}": Tính năng đang được xây dựng.`);
    handleFeatureClick();
  };


  if (loading) {
    return <LoadingSpinner message="Loading talent profiles..." />;
  }

  if (!talentData) {
    return <Card title="Tìm Nhân Tài"><p>Không có dữ liệu nhân tài.</p></Card>;
  }

  return (
    <Card title="Tìm Nhân Tài">
       {showInProgressMessage && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-700 text-sm">
          Chức năng này đang được xây dựng. Vui lòng quay lại sau!
        </div>
      )}
      <div className="mb-4 flex flex-wrap gap-2">
        <label htmlFor="cv-upload" className="cursor-pointer">
            <Button as="span" size="sm" variant="primary" onClick={handleFeatureClick}> {/* Using as="span" for button acting as label */}
                <ArrowUpTrayIcon className="h-4 w-4 mr-2" /> Tải lên CV (PDF, DOCX)
            </Button>
        </label>
        <input type="file" id="cv-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={() => handleFeatureClick()} />
        <Button onClick={handleFeatureClick} size="sm" variant="secondary">
            <SparklesIcon className="h-4 w-4 mr-2" /> AI Auto-pick Ứng Viên
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:-mx-2">
        <TalentColumn title="Nhân Tài Phù Hợp" talents={talentData.suitable} onAction={handleTalentAction} actionLabel="Gửi lời mời / Lưu"/>
        <TalentColumn title="Nhân Tài Đã Gửi Lời Mời" talents={talentData.invited} onAction={handleTalentAction} actionLabel="Xem Trạng Thái"/>
        <TalentColumn title="Nhân Tài Đã Lưu" talents={talentData.saved} onAction={handleTalentAction} actionLabel="Xem Hồ Sơ"/>
      </div>
      <p className="text-xs text-secondary-500 mt-6">
        Tính năng tìm kiếm và quản lý nhân tài đang trong quá trình phát triển.
      </p>
    </Card>
  );
};

export default TalentSection;
    