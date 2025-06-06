
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import LoadingSpinner from '../common/LoadingSpinner';
import { USER_MEMBERSHIP_PLANS, CREDIT_PRICE_VND } from '../../constants'; 
import { UserMembershipType } from '../../types';
import { getMembershipPlansEditable, updateMembershipPlanMock, getCreditPriceEditable, updateCreditPriceMock } from '../../services/adminDataService'; 
import { PencilIcon, CheckCircleIcon } from '../common/Icon';

type PlanValue = typeof USER_MEMBERSHIP_PLANS[UserMembershipType];
type EditableMembershipPlan = PlanValue & { key: UserMembershipType };

const MembershipCreditManagementSection: React.FC = () => {
  const [editablePlans, setEditablePlans] = useState<EditableMembershipPlan[]>([]);
  const [editableCreditPrice, setEditableCreditPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  const [currentEditingPlan, setCurrentEditingPlan] = useState<EditableMembershipPlan | null>(null);
  const [currentCreditPriceInput, setCurrentCreditPriceInput] = useState<string>('');

  const fetchEditableData = useCallback(async () => {
    setLoading(true);
    const plansData: typeof USER_MEMBERSHIP_PLANS = await getMembershipPlansEditable();
    const plansArray = (Object.keys(plansData) as UserMembershipType[]).map(key => ({
       ...plansData[key], 
       key: key 
    }));
    setEditablePlans(plansArray);

    const priceData = await getCreditPriceEditable();
    setEditableCreditPrice(priceData);
    setCurrentCreditPriceInput(priceData.toString());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEditableData();
  }, [fetchEditableData]);

  const handlePlanInputChange = (
    planKey: UserMembershipType, 
    field: 'name' | 'price' | 'feature', 
    value: string | number, 
    featureIndex?: number
  ) => {
    setCurrentEditingPlan(prevPlan => {
        if (!prevPlan || prevPlan.key !== planKey) return prevPlan;
        
        const updatedPlan = { ...prevPlan };
        if (field === 'feature' && typeof featureIndex === 'number' && featureIndex >=0 && featureIndex < updatedPlan.features.length) {
            const newFeatures = [...updatedPlan.features];
            newFeatures[featureIndex] = String(value);
            updatedPlan.features = newFeatures;
        } else if (field === 'price') {
            updatedPlan.price = Number(value);
        } else if (field === 'name') {
             updatedPlan.name = String(value);
        }
        return updatedPlan;
    });
  };
  
  const handleStartEditPlan = (plan: EditableMembershipPlan) => {
    setCurrentEditingPlan(JSON.parse(JSON.stringify(plan))); // Deep copy to edit
  };

  const handleCancelEditPlan = () => {
    setCurrentEditingPlan(null);
  }

  const handleSavePlanChanges = async (planKey: UserMembershipType) => {
    if (!currentEditingPlan) return;
    setLoading(true);
    // Prepare the plan data without the 'key' for the mock update function if it expects just plan details
    const { key, ...planDetailsToSave } = currentEditingPlan;
    await updateMembershipPlanMock(planKey, planDetailsToSave);
    
    setEditablePlans(prevPlans => prevPlans.map(p => p.key === planKey ? { ...currentEditingPlan } : p));
    setCurrentEditingPlan(null);
    setLoading(false);
    alert(`Plan "${currentEditingPlan.name}" updated (mock).`);
  };

  const handleSaveCreditPrice = async () => {
    const newPrice = parseFloat(currentCreditPriceInput);
    if (isNaN(newPrice) || newPrice < 0) {
        alert("Invalid credit price.");
        return;
    }
    setLoading(true);
    await updateCreditPriceMock(newPrice);
    setEditableCreditPrice(newPrice); 
    setLoading(false);
    alert(`Credit price updated to ${newPrice} VND (mock).`);
  };

  if (loading && editablePlans.length === 0) { 
    return <LoadingSpinner message="Loading management settings..." />;
  }

  return (
    <div className="space-y-8">
      <Card title="Quản Lý Gói Membership">
        {loading && editablePlans.length > 0 && <LoadingSpinner message="Updating..." />}
        <div className="space-y-6">
          {editablePlans.map((plan) => (
            <div key={plan.key} className="p-4 border border-secondary-200 rounded-lg shadow-sm">
              {currentEditingPlan?.key === plan.key ? (
                // Editing View
                <div className="space-y-3">
                  <Input label="Tên Gói" value={currentEditingPlan.name} onChange={(e) => handlePlanInputChange(plan.key, 'name', e.target.value)} />
                  <Input label="Giá (VND)" type="number" value={currentEditingPlan.price.toString()} onChange={(e) => handlePlanInputChange(plan.key, 'price', parseInt(e.target.value, 10) || 0)} />
                  <h4 className="text-sm font-medium text-secondary-700 mt-2">Tính năng:</h4>
                  {currentEditingPlan.features.map((feature, idx) => (
                     <Input key={idx} value={feature} onChange={(e) => handlePlanInputChange(plan.key, 'feature', e.target.value, idx)} className="mb-1"/>
                  ))}
                  <div className="flex space-x-2 justify-end mt-2">
                    <Button size="sm" variant="outline" onClick={handleCancelEditPlan}>Hủy</Button>
                    <Button size="sm" variant="primary" onClick={() => handleSavePlanChanges(plan.key)} isLoading={loading && currentEditingPlan?.key === plan.key}>Lưu Thay Đổi</Button>
                  </div>
                </div>
              ) : (
                // Display View
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-primary-700">{plan.name}</h3>
                      <p className="text-xl font-bold my-1 text-secondary-800">
                        {plan.price === 0 ? 'Miễn phí' : `${plan.price.toLocaleString('vi-VN')} VND`}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleStartEditPlan(plan)}>
                      <PencilIcon className="h-4 w-4 mr-1" /> Sửa
                    </Button>
                  </div>
                  <ul className="text-sm text-secondary-600 space-y-1 mt-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Quản Lý Giá Credit">
         {loading && editablePlans.length === 0 && <LoadingSpinner message="Updating..." />}
        <div className="p-4 space-y-3">
          <Input
            label={`Giá mỗi Credit (hiện tại: ${editableCreditPrice.toLocaleString('vi-VN')} VND)`}
            type="number"
            value={currentCreditPriceInput}
            onChange={(e) => setCurrentCreditPriceInput(e.target.value)}
            min="0"
          />
          <Button onClick={handleSaveCreditPrice} variant="primary" isLoading={loading && editablePlans.length > 0 /* Only when plans are not loading to avoid double spinner */}>
            Cập Nhật Giá Credit
          </Button>
        </div>
      </Card>
      <p className="text-xs text-secondary-500 text-center mt-4">Lưu ý: Các thay đổi được mô phỏng và không ảnh hưởng đến dữ liệu thực tế.</p>
    </div>
  );
};

export default MembershipCreditManagementSection;