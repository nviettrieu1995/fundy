
import React from 'react';
import Card from '../common/Card';
import { SparklesIcon, InformationCircleIcon } from '../common/Icon';

const VirtualAssistantSection: React.FC = () => {
  return (
    <Card title="Tạo Trợ Lý Ảo">
      <div className="flex flex-col items-center justify-center text-center p-8 bg-secondary-50 rounded-lg">
        <SparklesIcon className="h-16 w-16 text-primary-400 mb-4" />
        <h3 className="text-xl font-semibold text-secondary-700 mb-2">Tính năng Tạo Trợ Lý Ảo Sắp Ra Mắt!</h3>
        <p className="text-secondary-600 max-w-md">
          Chúng tôi đang nỗ lực phát triển tính năng này để bạn có thể tạo ra các trợ lý AI tùy chỉnh cho doanh nghiệp của mình.
          Vui lòng quay lại sau để trải nghiệm!
        </p>
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm flex items-start">
          <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>Đây là một chức năng đang được xây dựng. Các thông tin chi tiết và giao diện sẽ được cập nhật sớm.</span>
        </div>
      </div>
    </Card>
  );
};

export default VirtualAssistantSection;
    