import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, USER_MEMBERSHIP_PLANS, WORKER_MEMBERSHIP_PLANS } from '../../../constants';
import Button from '../../common/Button';
import Card from '../../common/Card'; // Re-use Card for styling consistency
import { CheckCircleIcon, SparklesIcon } from '../../common/Icon';
import { UserMembershipType, WorkerMembershipType } from '../../../types'; // Import enums

const PlanCard: React.FC<{ plan: any, isWorkerPlan?: boolean }> = ({ plan, isWorkerPlan = false }) => (
  <Card className={`flex flex-col ${plan.name.includes("Chuyên Nghiệp") || plan.name.includes("Professional") ? 'border-2 border-primary-500 shadow-xl' : 'shadow-lg'}`}>
    {plan.name.includes("Chuyên Nghiệp") || plan.name.includes("Professional") && (
      <div className="bg-primary-500 text-white text-xs font-semibold py-1 px-3 rounded-t-xl text-center">
        Phổ biến nhất
      </div>
    )}
    <div className="p-6 flex-grow">
      <h3 className="text-2xl font-semibold text-primary-600 mb-2">{plan.name}</h3>
      <p className="text-3xl font-bold text-secondary-800 mb-1">
        {plan.price === 0 ? 'Miễn phí' : `${plan.price.toLocaleString('vi-VN')} VND`}
        {plan.price > 0 && <span className="text-sm font-normal text-secondary-500">/tháng</span>}
      </p>
      <p className="text-sm text-secondary-500 mb-4 min-h-[40px]">
        {isWorkerPlan ? `Dành cho chuyên gia & người tìm việc.` : `Giải pháp tối ưu cho ${plan.name.includes("Chuyên Nghiệp") ? "doanh nghiệp lớn" : "doanh nghiệp vừa và nhỏ"}.`}
      </p>
      <ul className="space-y-2 text-sm text-secondary-600 mb-6">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
    <div className="p-6 bg-secondary-50 rounded-b-xl mt-auto">
      <Button as={Link} to="/register" variant="primary" className="w-full">
        Đăng Ký Ngay
      </Button>
      {plan.price > 0 && (
         <Button as={Link} to="/marketing/contact" variant="outline" size="sm" className="w-full mt-2">
            Liên hệ tư vấn
        </Button>
      )}
    </div>
  </Card>
);

const MarketingPricingPage: React.FC = () => {
  const userPlans = Object.values(UserMembershipType).map(key => USER_MEMBERSHIP_PLANS[key]);
  const workerPlans = Object.values(WorkerMembershipType).map(key => WORKER_MEMBERSHIP_PLANS[key]);

  return (
    <div className="py-12 bg-secondary-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SparklesIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-secondary-900 sm:text-5xl">
            Bảng Giá & Gói Dịch Vụ {APP_NAME}
          </h1>
          <p className="mt-4 text-xl text-secondary-600 max-w-2xl mx-auto">
            Chọn gói phù hợp nhất với nhu cầu của bạn và bắt đầu hành trình phát triển cùng AI.
          </p>
        </div>

        {/* User Plans Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-secondary-800 mb-8">Dành cho Doanh Nghiệp & Startup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPlans.map((plan, index) => (
              <PlanCard key={`user-plan-${index}`} plan={plan} />
            ))}
          </div>
        </section>

        {/* Worker Plans Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-secondary-800 mb-8">Dành cho Chuyên Gia & Người Tìm Việc (Worker)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {workerPlans.map((plan, index) => (
              <PlanCard key={`worker-plan-${index}`} plan={plan} isWorkerPlan={true} />
            ))}
          </div>
        </section>
        
        <div className="text-center mt-16">
            <p className="text-secondary-600">Bạn có nhu cầu đặc biệt hoặc cần tư vấn thêm?</p>
            <Button as={Link} to="/marketing/contact" variant="secondary" size="lg" className="mt-4">
                Liên Hệ Chúng Tôi
            </Button>
        </div>

      </div>
    </div>
  );
};

export default MarketingPricingPage;
