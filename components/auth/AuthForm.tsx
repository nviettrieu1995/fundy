
import React from 'react';
import { APP_NAME } from '../../constants';
import { SparklesIcon } from '../common/Icon'; // Example Icon

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  errorMessage?: string | null;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, children, footerContent, errorMessage, isLoading }) => {
  return (
    <div className="min-h-screen bg-secondary-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center text-primary-600">
          <SparklesIcon className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
          {title}
        </h2>
        {/* This sub-title might be redundant if title already includes APP_NAME */}
        {/* <p className="mt-2 text-center text-sm text-secondary-600">
          to {APP_NAME}
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            {children}
          </form>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          {footerContent && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">Or continue with</span>
                </div>
              </div>
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
