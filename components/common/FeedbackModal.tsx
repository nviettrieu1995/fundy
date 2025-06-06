import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import { APP_NAME } from '../../constants';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'bug'>('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    console.log('Feedback Data:', { feedbackType, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    // Mock success
    setSubmitStatus({ type: 'success', text: 'Cảm ơn bạn! Phản hồi của bạn đã được gửi đi.' });
    setSubject('');
    setMessage('');
    // Optionally close modal after a delay
    // setTimeout(onClose, 2000); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Gửi Phản Hồi / Báo Lỗi cho ${APP_NAME}`} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Loại phản hồi:</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="feedbackType" value="feedback" checked={feedbackType === 'feedback'} onChange={() => setFeedbackType('feedback')} className="form-radio h-4 w-4 text-primary-600 border-secondary-300"/>
              <span className="ml-2 text-sm text-secondary-700">Góp ý</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="feedbackType" value="bug" checked={feedbackType === 'bug'} onChange={() => setFeedbackType('bug')} className="form-radio h-4 w-4 text-primary-600 border-secondary-300"/>
              <span className="ml-2 text-sm text-secondary-700">Báo lỗi</span>
            </label>
          </div>
        </div>

        <Input
          label="Chủ đề"
          id="feedbackSubject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <div>
          <label htmlFor="feedbackMessage" className="block text-sm font-medium text-secondary-700 mb-1">
            Nội dung chi tiết ({feedbackType === 'bug' ? 'Mô tả lỗi, các bước tái hiện...' : 'Ý kiến đóng góp của bạn...'})
          </label>
          <textarea
            id="feedbackMessage"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="block w-full px-3 py-2 bg-white text-secondary-800 placeholder-secondary-500 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        
        {/* Optional: File upload for screenshots if reporting a bug */}
        {/* {feedbackType === 'bug' && (
          <Input label="Đính kèm ảnh (tùy chọn)" type="file" id="feedbackAttachment" />
        )} */}

        {submitStatus && (
          <p className={`text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {submitStatus.text}
          </p>
        )}

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
            Gửi
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FeedbackModal;
