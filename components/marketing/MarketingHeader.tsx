import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import { SparklesIcon } from '../common/Icon';
import Button from '../common/Button';

const MarketingHeader: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-primary-700 text-white' : 'text-secondary-100 hover:bg-primary-500 hover:text-white'
    } transition-colors`;

  return (
    <header className="bg-primary-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/marketing/home" className="flex items-center">
              <SparklesIcon className="h-8 w-8 mr-2 text-yellow-300" />
              <span className="font-bold text-xl">{APP_NAME}</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/marketing/home" className={navLinkClass}>Trang chủ</NavLink>
            <NavLink to="/marketing/about" className={navLinkClass}>Giới thiệu</NavLink>
            <NavLink to="/marketing/products-services" className={navLinkClass}>Sản phẩm/Dịch vụ</NavLink>
            <NavLink to="/marketing/pricing" className={navLinkClass}>Giá & Gói</NavLink>
            <NavLink to="/marketing/contact" className={navLinkClass}>Liên hệ</NavLink>
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <Button as={Link} to="/login" variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary-600">
              Đăng nhập
            </Button>
            <Button as={Link} to="/register" variant="secondary" size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-primary-700">
              Đăng ký
            </Button>
          </div>
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;
