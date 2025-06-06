
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { GuidelineContent } from '../../types';
import { getGuidelineData } from '../../services/dataService';
import { DocumentTextIcon } from '../common/Icon';

const GuidelineColumn: React.FC<{ title: string; content: GuidelineContent[]; onEdit: (columnIndex: number, itemIndex: number, pointIndex: number, newValue: string) => void; columnIndex: number }> = ({ title, content, onEdit, columnIndex }) => {
  return (
    <div className="w-full md:w-1/2 p-2 space-y-3">
      <h3 className="text-xl font-semibold text-primary-700 mb-3 border-b-2 border-primary-200 pb-2">{title}</h3>
      {content.map((item, itemIndex) => (
        <Card key={itemIndex} title={item.title} className="bg-primary-50">
          <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
            {item.points.map((point, pointIndex) => (
              <li key={pointIndex}>
                <textarea
                  value={point}
                  onChange={(e) => onEdit(columnIndex, itemIndex, pointIndex, e.target.value)}
                  rows={2}
                  className="w-full p-1 border border-secondary-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

const GuidelineSection: React.FC = () => {
  const [guidelines, setGuidelines] = useState<{ businessModel: GuidelineContent[], fundraising: GuidelineContent[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGuidelines = useCallback(async () => {
    setLoading(true);
    const data = await getGuidelineData();
    setGuidelines(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGuidelines();
  }, [fetchGuidelines]);

  const handleEdit = (columnIndex: number, itemIndex: number, pointIndex: number, newValue: string) => {
    setGuidelines(prev => {
      if (!prev) return null;
      const newGuidelines = JSON.parse(JSON.stringify(prev)); // Deep copy
      if (columnIndex === 0) { // Business Model
        newGuidelines.businessModel[itemIndex].points[pointIndex] = newValue;
      } else { // Fundraising
        newGuidelines.fundraising[itemIndex].points[pointIndex] = newValue;
      }
      return newGuidelines;
    });
     console.log(`Edited guideline. In a real app, this would sync with the backend.`);
  };

  const handleExport = (format: 'pdf' | 'pptx' | 'docx') => {
    alert(`Xuất file ${format.toUpperCase()}: Tính năng đang được xây dựng.`);
    // Actual export logic is complex and typically requires server-side processing or heavy client-side libraries.
  };

  if (loading) {
    return <LoadingSpinner message="Loading guidelines..." />;
  }

  if (!guidelines) {
    return <Card title="Guideline Doanh Nghiệp"><p>Không có dữ liệu guideline.</p></Card>;
  }

  return (
    <Card title="Guideline Doanh Nghiệp">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <GuidelineColumn title="Xây Dựng Mô Hình Kinh Doanh" content={guidelines.businessModel} onEdit={handleEdit} columnIndex={0} />
        <GuidelineColumn title="Gọi Vốn" content={guidelines.fundraising} onEdit={handleEdit} columnIndex={1}/>
      </div>
      <div className="mt-6 pt-4 border-t flex flex-wrap gap-2">
        <Button onClick={() => handleExport('pdf')} size="sm" variant="secondary">
            <DocumentTextIcon className="h-4 w-4 mr-2" /> Export PDF
        </Button>
        <Button onClick={() => handleExport('pptx')} size="sm" variant="secondary">
            <DocumentTextIcon className="h-4 w-4 mr-2" /> Export PPTX
        </Button>
        <Button onClick={() => handleExport('docx')} size="sm" variant="secondary">
            <DocumentTextIcon className="h-4 w-4 mr-2" /> Export DOCX
        </Button>
      </div>
      <p className="text-xs text-secondary-500 mt-3">
        Nội dung guideline có thể được AI Agent tự động chỉnh sửa dựa trên các cuộc trao đổi (tính năng mô phỏng).
      </p>
    </Card>
  );
};

export default GuidelineSection;
    