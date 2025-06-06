import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { APP_NAME } from '../../constants';
import { SparklesIcon, CheckCircleIcon } from './Icon';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const features = [
    "Xây dựng và tối ưu hóa Mô Hình Kinh Doanh.",
    "Chuẩn bị hồ sơ và chiến lược Gọi Vốn hiệu quả.",
    "Phân tích và tư vấn các vấn đề Pháp Lý cơ bản.",
    "Tìm kiếm và kết nối với Nhân Tài phù hợp.",
    "Tương tác với Trợ lý AI thông minh qua chat và giọng nói."
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chào mừng bạn đến với ${APP_NAME}!`} size="lg">
      <div className="text-center">
        <SparklesIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
        <p className="text-lg text-secondary-700 mb-4">
          {APP_NAME} là trợ lý AI đắc lực giúp bạn điều hành và phát triển doanh nghiệp một cách thông minh và hiệu quả.
        </p>
      </div>
      
      <div className="my-6">
        <h3 className="text-md font-semibold text-secondary-800 mb-2">Những gì {APP_NAME} có thể giúp bạn:</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-secondary-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-secondary-500 mb-6">
        Hãy bắt đầu khám phá các tính năng trên thanh điều hướng bên trái. Nếu có bất kỳ câu hỏi nào, đừng ngần ngại sử dụng Trợ lý AI ở góc dưới màn hình!
      </p>
      
      <Button onClick={onClose} variant="primary" className="w-full">
        Bắt đầu khám phá {APP_NAME}
      </Button>
    </Modal>
  );
};

export default OnboardingModal;
