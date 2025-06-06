import React from 'react';
import Card from '../common/Card';
import { CogIcon, InformationCircleIcon } from '../common/Icon';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const WorkerProfileSettingsSection: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
        <Card title="Cài Đặt Cá Nhân Worker">
            <p>Vui lòng đăng nhập để xem cài đặt.</p>
        </Card>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cập nhật thông tin cá nhân worker (mô phỏng).");
  };

  // This can be expanded with worker-specific fields like skills, portfolio URL, experience, etc.
  return (
    <Card title="Cài Đặt Cá Nhân Worker">
      <div className="p-4 bg-white rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <Input 
                label="Họ và Tên"
                id="workerFullName"
                defaultValue={user.name}
            />
            <Input 
                label="Email"
                id="workerEmail"
                type="email"
                defaultValue={user.email}
                disabled
            />
             <Input 
                label="Số điện thoại"
                id="workerPhone"
                type="tel"
                defaultValue={user.phone || ''}
            />
             <Input 
                label="Ảnh đại diện (URL)"
                id="workerAvatarUrl"
                defaultValue={user.avatarUrl}
            />
             {/* Worker specific fields can be added here */}
            <h3 className="text-md font-semibold text-secondary-700 pt-2 border-t">Đổi mật khẩu</h3>
             <Input 
                label="Mật khẩu hiện tại"
                id="workerCurrentPassword"
                type="password"
                placeholder="Để trống nếu không đổi"
            />
             <Input 
                label="Mật khẩu mới"
                id="workerNewPassword"
                type="password"
                placeholder="Để trống nếu không đổi"
            />
             <Input 
                label="Xác nhận mật khẩu mới"
                id="workerConfirmNewPassword"
                type="password"
                placeholder="Để trống nếu không đổi"
            />
            <Button type="submit" variant="primary">Lưu thay đổi</Button>
        </form>
      </div>
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm flex items-start">
          <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>Đây là giao diện cài đặt cá nhân cơ bản cho worker. Các tùy chọn chuyên biệt cho worker (VD: kỹ năng, portfolio) sẽ được bổ sung.</span>
      </div>
    </Card>
  );
};

export default WorkerProfileSettingsSection;