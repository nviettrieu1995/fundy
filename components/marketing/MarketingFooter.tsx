import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, FUNDY_CONTACT_EMAIL, FUNDY_PHONE_NUMBER } from '../../constants';

const MarketingFooter: React.FC = () => {
  return (
    <footer className="bg-secondary-800 text-secondary-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">{APP_NAME}</h5>
            <p className="text-sm">Giải pháp AI toàn diện cho sự phát triển của doanh nghiệp bạn.</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">Liên kết nhanh</h5>
            <ul className="space-y-1 text-sm">
              <li><Link to="/marketing/about" className="hover:text-white">Về Fundy</Link></li>
              <li><Link to="/marketing/products-services" className="hover:text-white">Sản phẩm & Dịch vụ</Link></li>
              <li><Link to="/marketing/pricing" className="hover:text-white">Bảng giá</Link></li>
              <li><Link to="/marketing/contact" className="hover:text-white">Liên hệ</Link></li>
              <li><Link to="/login" className="hover:text-white">Đăng nhập</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">Liên hệ chúng tôi</h5>
            <ul className="space-y-1 text-sm">
              <li>Email: <a href={`mailto:${FUNDY_CONTACT_EMAIL}`} className="hover:text-white">{FUNDY_CONTACT_EMAIL}</a></li>
              <li>Điện thoại: <a href={`tel:${FUNDY_PHONE_NUMBER}`} className="hover:text-white">{FUNDY_PHONE_NUMBER}</a></li>
              {/* Add social media icons here if needed */}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/marketing/privacy-policy" className="hover:text-white">Chính sách Bảo mật</Link> | 
            <Link to="/marketing/terms-of-service" className="hover:text-white ml-2">Điều khoản Dịch vụ</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
