import React from 'react';
import { Link } from 'react-router-dom'; // Added Link import
import { APP_NAME } from '../../../constants';
import { UsersIcon, LightBulbIcon, SparklesIcon } from '../../common/Icon';

const MarketingAboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SparklesIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-secondary-900 sm:text-5xl">
            Về {APP_NAME}
          </h1>
          <p className="mt-4 text-xl text-secondary-600 max-w-2xl mx-auto">
            Chúng tôi tin rằng công nghệ AI có thể thay đổi cách các doanh nghiệp vận hành và phát triển.
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Section */}
          <section className="text-center">
            <LightBulbIcon className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
            <h2 className="text-2xl font-semibold text-secondary-800 mb-2">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-secondary-600 max-w-3xl mx-auto">
              Sứ mệnh của {APP_NAME} là cung cấp các công cụ AI tiên tiến, dễ sử dụng để hỗ trợ các startups và doanh nghiệp vừa và nhỏ tối ưu hóa vận hành, đưa ra quyết định thông minh và đạt được mục tiêu tăng trưởng bền vững. Chúng tôi mong muốn dân chủ hóa sức mạnh của AI, giúp mọi doanh nghiệp đều có thể tiếp cận và hưởng lợi từ công nghệ này.
            </p>
          </section>

          {/* Vision Section */}
          <section className="text-center">
            <UsersIcon className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl font-semibold text-secondary-800 mb-2">Tầm Nhìn</h2>
            <p className="text-secondary-600 max-w-3xl mx-auto">
              {APP_NAME} hướng tới trở thành nền tảng AI hàng đầu, là đối tác tin cậy của các doanh nghiệp trong hành trình đổi mới sáng tạo và chinh phục thị trường. Chúng tôi không ngừng nghiên cứu và phát triển để mang đến những giải pháp AI đột phá, thực sự tạo ra giá trị cho khách hàng.
            </p>
          </section>
          
          {/* Team Section (Mock) */}
           <section className="text-center">
            <h2 className="text-2xl font-semibold text-secondary-800 mb-6">Đội Ngũ (Mock)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Mock team member card */}
              <div className="bg-secondary-50 p-6 rounded-lg shadow-md">
                <img src="https://picsum.photos/seed/person1/200" alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-medium text-secondary-700">Nguyễn Văn A</h3>
                <p className="text-primary-600">CEO & Founder</p>
              </div>
              <div className="bg-secondary-50 p-6 rounded-lg shadow-md">
                <img src="https://picsum.photos/seed/person2/200" alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-medium text-secondary-700">Trần Thị B</h3>
                <p className="text-primary-600">CTO</p>
              </div>
              <div className="bg-secondary-50 p-6 rounded-lg shadow-md">
                <img src="https://picsum.photos/seed/person3/200" alt="Team Member 3" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-medium text-secondary-700">Lê Văn C</h3>
                <p className="text-primary-600">Head of Product</p>
              </div>
            </div>
          </section>

          <div className="text-center mt-12">
            <p className="text-secondary-700">
              Tìm hiểu thêm về cách {APP_NAME} có thể giúp bạn: 
              <Link to="/marketing/products-services" className="text-primary-600 hover:text-primary-700 font-semibold ml-1">
                Khám phá Sản phẩm & Dịch vụ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingAboutPage;