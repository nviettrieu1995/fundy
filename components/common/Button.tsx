
import React from 'react';
import { ButtonProps } from '../../types';
import { ArrowPathIcon } from './Icon';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  as: Component = 'button', // Destructure 'as' and provide 'button' as default
  type, // Destructure type to handle it explicitly
  ...rest // Collect remaining props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 flex items-center justify-center';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  let spinnerColorClass = 'text-white'; // Default for primary, secondary, danger
  if (variant === 'outline') {
    spinnerColorClass = 'text-primary-600'; // Match text color for outline variant
  }

  const commonProps = {
    className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${ (disabled || isLoading) ? disabledStyles : ''} ${className}`,
    disabled: disabled || isLoading, // 'disabled' attribute
    ...rest, // Spread the rest of the props
  };

  return (
    <Component
      {...commonProps}
      // Conditionally add 'type' if it's a button element and type is provided or default to 'button'.
      // For other elements like 'span', 'type' is not a valid attribute.
      {...(Component === 'button' && { type: type || 'button' })}
    >
      {isLoading && <ArrowPathIcon className={`animate-spin -ml-1 mr-3 h-5 w-5 ${spinnerColorClass}`} />}
      {children}
    </Component>
  );
};

export default Button;
