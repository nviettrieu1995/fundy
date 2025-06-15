
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { CREDIT_PRICE_VND, BANK_DETAILS } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (creditsBought: number) => void;
}

const CreditModal: React.FC<CreditModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const { user, purchaseCredits } = useAuth();
  const [creditAmount, setCreditAmount] = useState(10); // Default 10 credits
  const [paymentStep, setPaymentStep] = useState(1); // 1: select amount, 2: payment info
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalCost = creditAmount * CREDIT_PRICE_VND;

  const handleProceedToPayment = () => {
    if (creditAmount > 0) {
      setPaymentStep(2);
    }
  };

  const handleConfirmPayment = async () => {
    if (!user) return;
    setIsProcessing(true);
    setStatusMsg('Đang xử lý thanh toán...');
    setStatusType('');
    const res = await purchaseCredits(creditAmount);
    setIsProcessing(false);
    setStatusMsg(res.message);
    setStatusType(res.success ? 'success' : 'error');
    if (res.success) {
      onPaymentSuccess(creditAmount);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm Credit">
      {paymentStep === 1 && (
        <div className="space-y-4">
          <div>
            <Input
              label={`Số lượng credit (1 credit = ${CREDIT_PRICE_VND.toLocaleString('vi-VN')} VND)`}
              type="number"
              id="creditAmount"
              value={creditAmount}
              onChange={(e) => setCreditAmount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              min="1"
            />
          </div>
          <p className="text-lg font-semibold">
            Tổng cộng: {totalCost.toLocaleString('vi-VN')} VND
          </p>
          <Button onClick={handleProceedToPayment} variant="primary" className="w-full" disabled={creditAmount <=0}>
            Tiến hành thanh toán
          </Button>
        </div>
      )}
      {paymentStep === 2 && (
        <div className="space-y-4">
          <h4 className="text-md font-semibold">Thông tin chuyển khoản:</h4>
          <ul className="list-disc list-inside text-sm text-secondary-700 space-y-1">
            <li>Ngân hàng: <strong>{BANK_DETAILS.bankName}</strong></li>
            <li>Tên tài khoản: <strong>{BANK_DETAILS.accountName}</strong></li>
            <li>Số tài khoản: <strong>{BANK_DETAILS.accountNumber}</strong></li>
            <li>Số tiền: <strong>{totalCost.toLocaleString('vi-VN')} VND</strong></li>
            <li>Nội dung chuyển khoản: <strong>themcredit {creditAmount} {/* Consider adding user ID here */}</strong></li>
          </ul>
          <p className="text-xs text-secondary-500">
            Lưu ý: Hệ thống sẽ tự động cập nhật credit sau khi nhận được thanh toán. Vui lòng ghi đúng nội dung chuyển khoản.
          </p>
          <div className="flex space-x-2">
            <Button onClick={() => setPaymentStep(1)} variant="outline" className="w-full" disabled={isProcessing}>
              Quay lại
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

export default CreditModal;
    