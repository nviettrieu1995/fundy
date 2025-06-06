
import React from 'react';
import { ArrowPathIcon } from './Icon';

const LoadingSpinner: React.FC<{ size?: number, message?: string }> = ({ size = 8, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ArrowPathIcon className={`animate-spin h-${size} w-${size} text-primary-600`} />
      {message && <p className="mt-2 text-secondary-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
    