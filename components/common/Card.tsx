
import React from 'react';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({ title, children, className = '', actions }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-800">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {actions && (
        <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;
    