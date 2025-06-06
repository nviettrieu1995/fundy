import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon as FeedbackIcon } from './Icon'; // Using chat icon for feedback
import FeedbackModal from './FeedbackModal';

const FeedbackButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9990 }}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary-600 text-white p-3 rounded-full shadow-lg hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
          aria-label="Gửi Phản Hồi hoặc Báo Lỗi"
          title="Gửi Phản Hồi / Báo Lỗi"
        >
          <FeedbackIcon className="h-6 w-6" />
        </button>
      </div>
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FeedbackButton;
