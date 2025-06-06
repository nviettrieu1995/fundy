
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from './AuthForm';
import Input from '../common/Input';
import Button from '../common/Button';
import SocialButton, { GoogleIcon, FacebookIcon } from './SocialButton';
import { APP_NAME } from '../../constants';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    const user = await register(name, email, password);
    if (user) {
      // App.tsx will handle redirection based on new user state
    } else {
      setError('Registration failed. Email might already be in use.');
    }
  };
  
  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    alert(`${provider} registration is not implemented yet.`);
  };

  return (
    <AuthForm
      title={`Create your ${APP_NAME} account`}
      onSubmit={handleSubmit}
      errorMessage={error}
      footerContent={
        <div className="mt-6 grid grid-cols-1 gap-3">
          <SocialButton provider="Google" onClick={() => handleSocialLogin('Google')} icon={<GoogleIcon />} />
          {/* <SocialButton provider="Facebook" onClick={() => handleSocialLogin('Facebook')} icon={<FacebookIcon />} /> */}
        </div>
      }
    >
      <Input
        id="name"
        label="Full name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
      />
      <Input
        id="email"
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Button type="submit" variant="primary" className="w-full" isLoading={loading} disabled={loading}>
        Register
      </Button>
      <div className="text-sm text-center mt-4">
        Already have an account?{' '}
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

export default RegisterPage;
