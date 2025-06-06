import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, FUNDY_PRODUCT_FEATURES } from '../../../constants';
import Button from '../../common/Button';
import { SparklesIcon, DocumentTextIcon, BriefcaseIcon, ScaleIcon, CheckCircleIcon, UsersIcon } from '../../common/Icon'; // Added UsersIcon

const featureIcons: { [key: string]: React.FC<any> } = {
    businessModel: DocumentTextIcon,
    fundraising: BriefcaseIcon,
    legalConsulting: ScaleIcon,
    talentMatching: UsersIcon, 
};

const MarketingProductsPage: React.FC = () => {
  return (
    <div className="py-12 bg-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SparklesIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-secondary-900 sm:text-5xl">
            Sản phẩm & Dịch vụ của {APP_NAME}
          </h1>
          <p className="mt-4 text-xl text-secondary-600 max-w-2xl mx-auto">
            Khám phá các giải pháp AI mạnh mẽ giúp doanh nghiệp bạn tăng trưởng và hiệu quả hơn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {Object.entries(FUNDY_PRODUCT_FEATURES).map(([key, feature]) => {
            const IconComponent = featureIcons[key] || SparklesIcon;
            return (
              <div key={key} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <IconComponent className="h-10 w-10 text-primary-500 mb-3" />
                <h2 className="text-2xl font-semibold text-secondary-800 mb-2">{feature.name}</h2>
                <p className="text-secondary-600 mb-4">{feature.description}</p>
                {/* You can add a "Learn more" link here if you have dedicated pages for each feature */}
              </div>
            );
          })}
        </div>
        
        {/* Results / Benefits Section */}
        <section className="py-12 bg-white rounded-lg shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-secondary-800 mb-6">Kết Quả Thực Tế</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="p-4 bg-green-50 rounded-lg">
                <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-xl font-semibold text-green-700">Tiết kiệm đến 60% thời gian</p>
                <p className="text-sm text-secondary-600">cho các tác vụ phân tích và soạn thảo.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <SparklesIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xl font-semibold text-blue-700">Tăng hiệu quả công việc 80%</p>
                <p className="text-sm text-secondary-600">nhờ tự động hóa và gợi ý thông minh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mock Customer Logos */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-semibold text-secondary-700 mb-6">Được tin dùng bởi (Khách hàng tiêu biểu - Mock)</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <span className="text-secondary-500 italic text-lg">StartupX</span>
              <span className="text-secondary-500 italic text-lg">InnovateTech</span>
              <span className="text-secondary-500 italic text-lg">Business Solutions Ltd.</span>
              <span className="text-secondary-500 italic text-lg">Growth Co.</span>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <Button as={Link} to="/marketing/pricing" variant="primary" size="lg">
            Xem Bảng Giá & Đăng Ký
          </Button>
        </div>
      </div>
    </div>
  );
};

// Removed local UsersIcon definition as it's imported from common/Icon.tsx

export default MarketingProductsPage;