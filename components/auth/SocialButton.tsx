
import React from 'react';

interface SocialButtonProps {
  provider: 'Google' | 'Facebook';
  onClick: () => void;
  icon: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick, icon }) => {
  const providerStyles = {
    Google: 'border-secondary-300 hover:bg-secondary-50 text-secondary-700',
    Facebook: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${providerStyles[provider]}`}
    >
      <span className="sr-only">Sign in with {provider}</span>
      <div className="w-5 h-5 mr-2">{icon}</div>
      Sign in with {provider}
    </button>
  );
};

// Example SVG icons (replace with actual SVGs or from a library)
export const GoogleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56,12.25C22.56,11.47 22.49,10.72 22.36,10H12V14.5H18.04C17.73,16.07 16.86,17.37 15.42,18.29V21H19.16C21.34,19.07 22.56,15.95 22.56,12.25Z"/>
    <path fill="#34A853" d="M12,24A11.99,11.99 0 0,1 0,12A11.99,11.99 0 0,1 12,0A11.91,11.91 0 0,1 18.05,1.82L15.42,4.1C14.45,3.42 13.31,3 12,3A7.87,7.87 0 0,0 4.58,10.25H0.84V12.75H4.58A7.87,7.87 0 0,0 12,20C13.31,20 14.45,19.58 15.42,18.9L18.05,21.18A11.91,11.91 0 0,1 12,24Z"/>
    <path fill="#FBBC05" d="M4.58,10.25A7.29,7.29 0 0,1 4.21,7.5H0.84A11.93,11.93 0 0,0 0,12A11.93,11.93 0 0,0 0.84,16.5H4.21A7.29,7.29 0 0,1 4.58,13.75V10.25Z"/>
    <path fill="#EA4335" d="M12,3C14.07,3 15.86,3.73 17.23,4.96L19.93,2.25A11.93,11.93 0 0,0 12,0A11.99,11.99 0 0,0 0,12C0,12.08 0,12.16 0,12.25H0.09L4.58,10.25V10.25A7.86,7.86 0 0,1 12,3Z"/>
  </svg>
);

export const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22,12C22,6.48,17.52,2,12,2S2,6.48,2,12c0,5.04,3.69,9.21,8.44,9.88V15.47H7.7V12.5h2.73V10.1c0-2.71,1.61-4.19,4.08-4.19c1.15,0,2.33,0.22,2.33,0.22v2.44h-1.22c-1.33,0-1.77,0.84-1.77,1.72v2.01h2.7l-0.44,2.97h-2.26v6.41C18.31,21.21,22,17.04,22,12Z"/>
  </svg>
);

export default SocialButton;
    