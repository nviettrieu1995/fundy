
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import Input from '../common/Input';
import Button from '../common/Button';
import { APP_NAME } from '../../constants';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setMessage(`If an account exists for ${email}, a password reset link has been sent.`);
    setEmail('');
  };

  return (
    <AuthForm
      title={`Reset your ${APP_NAME} password`}
      onSubmit={handleSubmit}
      errorMessage={null} // Or handle errors from API
    >
      <p className="text-sm text-secondary-600 mb-4">
        Enter your email address and we will send you a link to reset your password.
      </p>
      <Input
        id="email"
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      {message && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">{message}</p>
        </div>
      )}
      <Button type="submit" variant="primary" className="w-full" isLoading={loading} disabled={loading}>
        Send reset link
      </Button>
      <div className="text-sm text-center mt-4">
        Remember your password?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </Link>
      </div>
      <div className="text-sm text-center mt-4">
        <Link to="/marketing/home" className="font-medium text-secondary-600 hover:text-secondary-500">
          &larr; Back to {APP_NAME} Home
        </Link>
      </div>
    </AuthForm>
  );
};

export default ForgotPasswordPage;
