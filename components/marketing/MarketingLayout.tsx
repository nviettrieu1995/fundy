import React from 'react';
import { Outlet } from 'react-router-dom';
import MarketingHeader from './MarketingHeader';
import MarketingFooter from './MarketingFooter';

const MarketingLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-grow">
        <Outlet /> {/* Nested marketing routes will render here */}
      </main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingLayout;
