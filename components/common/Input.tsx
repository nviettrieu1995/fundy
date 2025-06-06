
import React from 'react';
import { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({ label, id, error, type = 'text', className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-secondary-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`block w-full px-3 py-2 
                   bg-white /* Changed background to white for light theme inputs */
                   text-secondary-800 /* Dark text color for entered text */
                   placeholder-secondary-500 /* Medium gray for placeholder text */
                   border ${error ? 'border-red-500' : 'border-secondary-300'} /* Standard border */
                   rounded-md shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                   sm:text-sm ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;