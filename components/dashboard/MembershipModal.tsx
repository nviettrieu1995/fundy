
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { USER_MEMBERSHIP_PLANS, BANK_DETAILS } from '../../constants';
import { UserMembershipType } from '../../types';
import { CheckCircleIcon } from '../common/Icon';
import { useAuth } from '../../contexts/AuthContext';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (planKey: UserMembershipType) => void; // Pass plan key on success
}

type PlanKey = UserMembershipType; // Use the enum type for keys

const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const { user, upgradeMembershipPlan } = useAuth();
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey | null>(null);
  const [paymentStep, setPaymentStep] = useState(1); // 1: select plan, 2: payment info
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planKey: PlanKey) => {
    setSelectedPlanKey(planKey);
    setPaymentStep(2);
  };

  const selectedPlanDetails = selectedPlanKey ? USER_MEMBERSHIP_PLANS[selectedPlanKey] : null;

  const handleConfirmPayment = async () => {
    if (!selectedPlanKey || !selectedPlanDetails || !user) return;
    setIsProcessing(true);
    setStatusMsg('Đang xử lý thanh toán...');
    setStatusType('');
    const res = await upgradeMembershipPlan(selectedPlanKey);
    setIsProcessing(false);
    setStatusMsg(res.message);
    setStatusType(res.success ? 'success' : 'error');
    if (res.success) {
      onPaymentSuccess(selectedPlanKey);
    }
  };

  // Get plan values (objects) and their keys (UserMembershipType)
  const plansArray = (Object.keys(USER_MEMBERSHIP_PLANS) as PlanKey[])
    .filter(key => key !== UserMembershipType.Free) // Exclude Free plan from upgrade options
    .map(key => ({ key, ...USER_MEMBERSHIP_PLANS[key] }));


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nâng Cấp Membership">
      {paymentStep === 1 && (
        <div className="space-y-4">
          {plansArray.map((plan) => (
            <div key={plan.key} className="p-4 border border-secondary-200 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary-600">{plan.name}</h4>
              <p className="text-xl font-bold my-1">
                {plan.price === 0 ? 'Miễn phí' : `${plan.price.toLocaleString('vi-VN')} VND`}
              </p>
              <ul className="text-sm text-secondary-600 space-y-1 mb-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleSelectPlan(plan.key)} variant="primary" className="w-full">
                Chọn gói {plan.name}
              </Button>
            </div>
          ))}
        </div>
      )}
      {paymentStep === 2 && selectedPlanDetails && selectedPlanKey && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Xác nhận nâng cấp gói: {selectedPlanDetails.name}</h3>
          <p className="text-md">Chi phí: <strong>{selectedPlanDetails.price.toLocaleString('vi-VN')} VND</strong></p>
          <h4 className="text-md font-semibold">Thông tin chuyển khoản:</h4>
           <ul className="list-disc list-inside text-sm text-secondary-700 space-y-1">
            <li>Ngân hàng: <strong>{BANK_DETAILS.bankName}</strong></li>
            <li>Tên tài khoản: <strong>{BANK_DETAILS.accountName}</strong></li>
            <li>Số tài khoản: <strong>{BANK_DETAILS.accountNumber}</strong></li>
            <li>Số tiền: <strong>{selectedPlanDetails.price.toLocaleString('vi-VN')} VND</strong></li>
            <li>Nội dung chuyển khoản: <strong>nangcap {selectedPlanKey} {/* Consider adding user ID here */}</strong></li>
          </ul>
          <p className="text-xs text-secondary-500">
            Hệ thống sẽ tự động cập nhật gói sau khi nhận được thanh toán.
          </p>
          <div className="flex space-x-2">
            <Button onClick={() => {setPaymentStep(1); setSelectedPlanKey(null);}} variant="outline" className="w-full" disabled={isProcessing}>
              Chọn gói khác
            </Button>
            <Button onClick={handleConfirmPayment} variant="primary" className="w-full" disabled={isProcessing}>
              {isProcessing ? 'Đang xử lý...' : 'Đã chuyển khoản'}
            </Button>
          </div>
          {statusMsg && (
            <p className={`text-sm ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>{statusMsg}</p>
          )}
        </div>
      )}
    </Modal>
  );
};

export default MembershipModal;