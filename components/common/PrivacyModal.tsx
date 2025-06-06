import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { APP_NAME } from '../../constants';
import { ShieldCheckIcon } from './Icon';

interface PrivacyModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void; // Allow closing, perhaps for a "read later" scenario or if acceptance is not strictly blocking
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onAccept, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Cam Kết Bảo Mật và Điều Khoản Sử Dụng ${APP_NAME}`} size="xl">
      <div className="text-left max-h-[70vh] overflow-y-auto pr-2 space-y-4">
        <div className="flex items-center justify-center mb-4">
            <ShieldCheckIcon className="h-10 w-10 text-primary-500 mr-3"/>
            <p className="text-lg font-semibold text-secondary-700">Chúng tôi coi trọng quyền riêng tư của bạn.</p>
        </div>

        <section>
          <h3 className="text-md font-semibold text-secondary-800 mb-1">1. Giới thiệu (Mô phỏng)</h3>
          <p className="text-sm text-secondary-600">
            Chào mừng bạn đến với {APP_NAME}. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản và chính sách bảo mật được nêu dưới đây. Vui lòng đọc kỹ trước khi tiếp tục.
          </p>
        </section>

        <section>
          <h3 className="text-md font-semibold text-secondary-800 mb-1">2. Thu thập Thông Tin (Mô phỏng)</h3>
          <p className="text-sm text-secondary-600">
            Chúng tôi thu thập thông tin bạn cung cấp khi đăng ký, sử dụng dịch vụ (ví dụ: nội dung chat với AI, tài liệu tải lên để phân tích). Dữ liệu này được sử dụng để cải thiện dịch vụ, cá nhân hóa trải nghiệm và cung cấp hỗ trợ.
            Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn với bên thứ ba mà không có sự đồng ý của bạn, trừ khi được yêu cầu bởi pháp luật.
          </p>
        </section>
        
        <section>
          <h3 className="text-md font-semibold text-secondary-800 mb-1">3. Sử Dụng Dữ Liệu AI (Mô phỏng)</h3>
          <p className="text-sm text-secondary-600">
            Dữ liệu bạn cung cấp cho AI (prompts, tài liệu) có thể được sử dụng để huấn luyện và cải thiện mô hình AI của chúng tôi. Chúng tôi sẽ ẩn danh và tổng hợp dữ liệu để đảm bảo quyền riêng tư. Bạn có quyền yêu cầu xóa dữ liệu cá nhân của mình.
          </p>
        </section>

        <section>
          <h3 className="text-md font-semibold text-secondary-800 mb-1">4. Bảo Mật (Mô phỏng)</h3>
          <p className="text-sm text-secondary-600">
            {APP_NAME} áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ dữ liệu của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Logo bảo mật (ví dụ: ISO 27001, SOC 2 - mock) sẽ được hiển thị để minh chứng.
          </p>
        </section>

        <section>
          <h3 className="text-md font-semibold text-secondary-800 mb-1">5. Điều Khoản Sử Dụng (Mô phỏng)</h3>
          <p className="text-sm text-secondary-600">
            Bạn đồng ý không sử dụng dịch vụ cho các mục đích bất hợp pháp hoặc vi phạm quyền của người khác. Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện vi phạm.
          </p>
        </section>
        
        <p className="text-xs text-secondary-500 mt-4">
          Đây là nội dung mô phỏng. Vui lòng tham khảo Điều khoản Dịch vụ và Chính sách Bảo mật đầy đủ <a href="/marketing/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">tại đây</a> (placeholder).
        </p>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button onClick={onClose} variant="outline">
          Đóng
        </Button>
        <Button onClick={onAccept} variant="primary">
          Tôi đã đọc và đồng ý
        </Button>
      </div>
    </Modal>
  );
};

export default PrivacyModal;
