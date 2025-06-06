import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import { APP_NAME, FUNDY_TAGLINE, FUNDY_BENEFITS } from '../../../constants';
import { CheckCircleIcon, SparklesIcon } from '../../common/Icon'; // Assuming you have these or similar icons

// Map icon names from constants to actual icon components
const iconMap: { [key: string]: React.FC<any> } = {
    ClockIcon: CheckCircleIcon, // Replace with actual ClockIcon if you have one
    TrendingUpIcon: CheckCircleIcon, // Replace
    LightBulbIcon: SparklesIcon, // Replace
    AcademicCapIcon: CheckCircleIcon, // Replace
};


const MarketingHomePage: React.FC = () => {
  return (
    <div className="bg-secondary-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SparklesIcon className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            {APP_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            {FUNDY_TAGLINE}
          </p>
          <div className="space-x-4">
            <Button as={Link} to="/register" variant="secondary" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-primary-700">
              Bắt đầu Miễn Phí
            </Button>
            <Button as={Link} to="/marketing/products-services" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-600">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary-800 mb-12">Tại sao chọn {APP_NAME}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FUNDY_BENEFITS.map((benefit) => {
                const IconComponent = iconMap[benefit.icon] || CheckCircleIcon;
                return (
                    <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <IconComponent className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-secondary-700 mb-2">{benefit.title}</h3>
                        <p className="text-secondary-600 text-sm">{benefit.description}</p>
                    </div>
                );
            })}
          </div>
        </div>
      </section>

      {/* How It Works / Features Overview (Simplified) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-secondary-800 mb-12">Giải pháp {APP_NAME} mang lại</h2>
           <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="relative">
              <dt>
                <SparklesIcon className="absolute h-8 w-8 text-primary-500" />
                <p className="ml-12 text-lg leading-6 font-medium text-secondary-900">Hỗ trợ Toàn Diện</p>
              </dt>
              <dd className="mt-2 ml-12 text-base text-secondary-500">
                Từ xây dựng mô hình kinh doanh, chuẩn bị gọi vốn, đến tư vấn pháp lý và tìm kiếm nhân tài - {APP_NAME} đồng hành cùng bạn.
              </dd>
            </div>
             <div className="relative">
              <dt>
                <CheckCircleIcon className="absolute h-8 w-8 text-green-500" />
                <p className="ml-12 text-lg leading-6 font-medium text-secondary-900">Ứng Dụng AI Thông Minh</p>
              </dt>
              <dd className="mt-2 ml-12 text-base text-secondary-500">
                Tận dụng sức mạnh của trí tuệ nhân tạo để phân tích, dự đoán và đưa ra những gợi ý chiến lược giá trị.
              </dd>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-800 mb-6">Sẵn sàng để đưa doanh nghiệp của bạn lên tầm cao mới?</h2>
          <p className="text-secondary-600 mb-8 max-w-xl mx-auto">
            Đăng ký {APP_NAME} ngay hôm nay và trải nghiệm sự khác biệt mà AI mang lại.
          </p>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Đăng Ký Ngay
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MarketingHomePage;
