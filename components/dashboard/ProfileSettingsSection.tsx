
import React, { useState } from 'react';
import Card from '../common/Card';
import { CogIcon, InformationCircleIcon, UserCircleIcon, CreditCardIcon } from '../common/Icon'; // Removed BellIcon, ReceiptIcon
import { useAuth } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { MOCK_INVOICES, MOCK_NOTIFICATIONS, MOCK_TRANSACTION_HISTORY, APP_NAME } from '../../constants';

// Placeholder icons if not available
const BellIconPlaceholder: React.FC<any> = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>;
const InvoiceIconPlaceholder: React.FC<any> = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const HistoryIconPlaceholder: React.FC<any> = (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>;


type Section = 'profile' | 'usage' | 'invoices' | 'notifications' | 'transactions';

const ProfileSettingsSection: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeSubSection, setActiveSubSection] = useState<Section>('profile');
  
  // Form state for profile editing
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  // Password fields - typically handled separately for security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  if (!user) {
    return (
        <Card title={`Cài Đặt Cá Nhân - ${APP_NAME}`}>
            <p>Vui lòng đăng nhập để xem cài đặt.</p>
        </Card>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update
    if (newPassword && newPassword !== confirmNewPassword) {
        alert("Mật khẩu mới không khớp!");
        return;
    }
    updateUser({ name, avatarUrl }); // Update non-sensitive info
    if (newPassword && currentPassword) { // Mock password change
        alert("Mật khẩu đã được thay đổi (mô phỏng).")
    } else {
        alert("Thông tin cá nhân đã được cập nhật (mô phỏng).");
    }
    setNewPassword('');
    setCurrentPassword('');
    setConfirmNewPassword('');
  };

  const renderSubSection = () => {
    switch(activeSubSection) {
        case 'profile':
            return (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input label="Họ và Tên" id="fullName" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input label="Email" id="email" type="email" defaultValue={user.email} disabled />
                    <Input label="Ảnh đại diện (URL)" id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                    
                    <h3 className="text-md font-semibold text-secondary-700 pt-4 border-t mt-6">Đổi mật khẩu</h3>
                    <Input label="Mật khẩu hiện tại" id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Để trống nếu không đổi" />
                    <Input label="Mật khẩu mới" id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Để trống nếu không đổi" />
                    <Input label="Xác nhận mật khẩu mới" id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} placeholder="Để trống nếu không đổi" />
                    <Button type="submit" variant="primary">Lưu thay đổi</Button>
                </form>
            );
        case 'usage':
            return (
                <div>
                    <h3 className="text-xl font-semibold text-secondary-800 mb-3">Lịch Sử Sử Dụng</h3>
                    <p className="text-secondary-600 mb-2">Số dư credit hiện tại: <span className="font-bold">{user.credits}</span></p>
                    <p className="text-secondary-600 mb-4">Gói dịch vụ: <span className="font-bold">{user.membershipPlanName || user.membership}</span></p>
                    <div className="bg-secondary-100 p-4 rounded-md">
                        <h4 className="font-medium text-secondary-700">Thống kê sử dụng tháng này (Mock):</h4>
                        <ul className="list-disc list-inside text-sm text-secondary-600 mt-2">
                            <li>Lượt chat AI: 150/500</li>
                            <li>Phút gọi AI: 30/100</li>
                            <li>Tài liệu pháp lý phân tích: 2</li>
                            <li>Checklist hoàn thành: 5</li>
                        </ul>
                    </div>
                </div>
            );
        case 'invoices':
            return (
                <div>
                    <h3 className="text-xl font-semibold text-secondary-800 mb-3">Hóa Đơn</h3>
                    {MOCK_INVOICES.length > 0 ? (
                        <ul className="space-y-3">
                        {MOCK_INVOICES.map(invoice => (
                            <li key={invoice.id} className="p-3 border rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-medium">{invoice.description} ({invoice.id})</p>
                                <p className="text-sm text-secondary-500">Ngày: {invoice.date} - Số tiền: {invoice.amount.toLocaleString('vi-VN')} VND</p>
                            </div>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{invoice.status}</span>
                            </li>
                        ))}
                        </ul>
                    ) : <p className="text-secondary-600">Chưa có hóa đơn nào.</p>}
                </div>
            );
        case 'notifications':
             return (
                <div>
                    <h3 className="text-xl font-semibold text-secondary-800 mb-3">Thông Báo</h3>
                    {MOCK_NOTIFICATIONS.length > 0 ? (
                        <ul className="space-y-3">
                        {MOCK_NOTIFICATIONS.map(notif => (
                            <li key={notif.id} className={`p-3 border-l-4 rounded-md ${notif.type === 'warning' ? 'border-yellow-400 bg-yellow-50' : 'border-blue-400 bg-blue-50'}`}>
                                <p className={`font-medium ${notif.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'}`}>{notif.message}</p>
                                <p className="text-xs text-secondary-500 mt-1">{new Date(notif.date).toLocaleString()}</p>
                            </li>
                        ))}
                        </ul>
                    ) : <p className="text-secondary-600">Không có thông báo mới.</p>}
                </div>
            );
        case 'transactions':
            return (
                <div>
                    <h3 className="text-xl font-semibold text-secondary-800 mb-3">Lịch Sử Giao Dịch</h3>
                    {MOCK_TRANSACTION_HISTORY.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-secondary-100">
                                    <tr>
                                        <th className="p-2 text-left font-medium text-secondary-600">Ngày</th>
                                        <th className="p-2 text-left font-medium text-secondary-600">Mô tả</th>
                                        <th className="p-2 text-right font-medium text-secondary-600">Số tiền (VND)</th>
                                        <th className="p-2 text-left font-medium text-secondary-600">Loại</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_TRANSACTION_HISTORY.map(trx => (
                                        <tr key={trx.id} className="border-b hover:bg-secondary-50">
                                            <td className="p-2">{trx.date}</td>
                                            <td className="p-2">{trx.description}</td>
                                            <td className={`p-2 text-right ${trx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{trx.amount !== 0 ? trx.amount.toLocaleString('vi-VN') : '-'}</td>
                                            <td className="p-2 capitalize">{trx.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : <p className="text-secondary-600">Chưa có giao dịch nào.</p>}
                </div>
            );
        default: return null;
    }
  }

  const subNavItems: { key: Section, label: string, icon: React.FC<any> }[] = [
      { key: 'profile', label: 'Hồ Sơ Cá Nhân', icon: UserCircleIcon },
      { key: 'usage', label: 'Lịch Sử Sử Dụng', icon: CreditCardIcon },
      { key: 'invoices', label: 'Hóa Đơn', icon: InvoiceIconPlaceholder },
      { key: 'notifications', label: 'Thông Báo', icon: BellIconPlaceholder },
      { key: 'transactions', label: 'Lịch Sử Giao Dịch', icon: HistoryIconPlaceholder },
  ];

  return (
    <Card title={`Cài Đặt Tài Khoản - ${APP_NAME}`}>
        <div className="flex flex-col md:flex-row gap-6">
            <aside className="md:w-1/4">
                <nav className="space-y-1">
                    {subNavItems.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setActiveSubSection(item.key)}
                            className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                                ${activeSubSection === item.key 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'}`}
                        >
                            <item.icon className={`h-5 w-5 ${activeSubSection === item.key ? 'text-primary-600' : 'text-secondary-400'}`} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <div className="md:w-3/4 p-4 bg-white rounded-lg shadow">
                {renderSubSection()}
            </div>
        </div>
         <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm flex items-start">
            <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Một số thông tin như Lịch sử sử dụng, Hóa đơn và Thông báo được mô phỏng cho mục đích demo.</span>
        </div>
    </Card>
  );
};

export default ProfileSettingsSection;