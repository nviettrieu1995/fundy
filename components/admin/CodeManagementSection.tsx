
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import LoadingSpinner from '../common/LoadingSpinner';
import { GeneratedCode, UserMembershipType } from '../../types';
import { getGeneratedCodes, addGeneratedCode } from '../../services/adminDataService';
import { USER_MEMBERSHIP_PLANS } from '../../constants';
import { TagIcon, CheckCircleIcon, XCircleIcon } from '../common/Icon';

const CodeManagementSection: React.FC = () => {
  const [codes, setCodes] = useState<GeneratedCode[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for generating codes
  const [newCodeType, setNewCodeType] = useState<'membership' | 'coupon'>('coupon');
  const [membershipPlanKey, setMembershipPlanKey] = useState<UserMembershipType>(UserMembershipType.Advanced); // Default to a non-free plan
  const [couponDetails, setCouponDetails] = useState(''); // e.g., "10% off" or "50000 VND off"
  const [quantity, setQuantity] = useState(1);

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    const data = await getGeneratedCodes();
    setCodes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);
  
  const generateRandomCode = (length = 8) => {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  }

  const handleGenerateCodes = async () => {
    if (quantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }
    if (newCodeType === 'coupon' && !couponDetails.trim()){
        alert("Please provide coupon details.");
        return;
    }

    setLoading(true);
    const newCodesGenerated: GeneratedCode[] = [];
    for (let i = 0; i < quantity; i++) {
      const codeValue = generateRandomCode();
      const planDetailsObj = USER_MEMBERSHIP_PLANS[membershipPlanKey];
      const details = newCodeType === 'membership' 
        ? `${planDetailsObj.name} Plan Access`
        : couponDetails;
      
      const newCode: GeneratedCode = {
        id: `code_${Date.now()}_${i}`,
        code: codeValue,
        type: newCodeType,
        details: details,
        isUsed: false,
        createdAt: new Date(),
      };
      await addGeneratedCode(newCode); 
      newCodesGenerated.push(newCode);
    }
    setCodes(prev => [...newCodesGenerated, ...prev].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
    
    setLoading(false);
    alert(`${quantity} code(s) generated successfully (mock).`);
    setCouponDetails('');
    setQuantity(1);
  };

  if (loading && codes.length === 0) {
    return <LoadingSpinner message="Loading codes..." />;
  }

  return (
    <div className="space-y-6">
      <Card title="Tạo Code Mới">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <label htmlFor="codeType" className="block text-sm font-medium text-secondary-700 mb-1">Loại Code</label>
            <select
              id="codeType"
              value={newCodeType}
              onChange={(e) => setNewCodeType(e.target.value as 'membership' | 'coupon')}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-secondary-900"
            >
              <option value="coupon">Coupon Ưu Đãi</option>
              <option value="membership">Membership</option>
            </select>
          </div>

          {newCodeType === 'membership' && (
            <div>
              <label htmlFor="membershipPlan" className="block text-sm font-medium text-secondary-700 mb-1">Gói Membership</label>
              <select
                id="membershipPlan"
                value={membershipPlanKey}
                onChange={(e) => setMembershipPlanKey(e.target.value as UserMembershipType)}
                className="block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-secondary-900"
              >
                {(Object.keys(USER_MEMBERSHIP_PLANS) as UserMembershipType[])
                    .filter((key) => key !== UserMembershipType.Free) 
                    .map((key) => {
                        const plan = USER_MEMBERSHIP_PLANS[key];
                        return <option key={key} value={key}>{plan.name}</option>;
                    })}
              </select>
            </div>
          )}

          {newCodeType === 'coupon' && (
            <Input
              label="Chi tiết Coupon (VD: Giảm 10%, Miễn phí vận chuyển)"
              value={couponDetails}
              onChange={(e) => setCouponDetails(e.target.value)}
              placeholder="e.g., 10% off first purchase"
            />
          )}
          
          <Input
            label="Số lượng"
            type="number"
            value={quantity.toString()}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            min="1"
          />
        </div>
        <div className="p-4 border-t">
            <Button onClick={handleGenerateCodes} variant="primary" isLoading={loading}>
                <TagIcon className="h-5 w-5 mr-2" /> Tạo Code
            </Button>
        </div>
      </Card>

      <Card title="Danh Sách Code Đã Tạo">
        {loading && codes.length > 0 && <LoadingSpinner message="Refreshing codes..." />}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-secondary-100">
              <tr>
                {['Code', 'Loại', 'Chi tiết', 'Trạng thái', 'Ngày tạo', 'Hành động'].map(header => (
                  <th key={header} className="px-4 py-2 border-b text-left text-xs font-semibold text-secondary-600 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-secondary-700 text-sm">
              {codes.map(code => (
                <tr key={code.id} className="hover:bg-secondary-50">
                  <td className="px-4 py-2 border-b font-mono">{code.code}</td>
                  <td className="px-4 py-2 border-b capitalize">{code.type}</td>
                  <td className="px-4 py-2 border-b">{code.details}</td>
                  <td className="px-4 py-2 border-b">
                    {code.isUsed ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircleIcon className="h-3 w-3 mr-1" /> Đã sử dụng
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-3 w-3 mr-1" /> Có sẵn
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{new Date(code.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">
                    <Button size="sm" variant="outline" onClick={() => alert(`Code action for ${code.code} (mock)`)} disabled={code.isUsed}>
                      {code.isUsed ? 'Đã dùng' : 'Vô hiệu hóa'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {codes.length === 0 && !loading && <p className="text-center py-4 text-secondary-500">Chưa có code nào được tạo.</p>}
        </div>
      </Card>
       <p className="text-xs text-secondary-500 text-center mt-4">Quản lý code được mô phỏng. Dữ liệu không được lưu trữ.</p>
    </div>
  );
};

export default CodeManagementSection;