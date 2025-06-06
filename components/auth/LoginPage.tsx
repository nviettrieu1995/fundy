
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from './AuthForm';
import Input from '../common/Input';
import Button from '../common/Button';
import SocialButton, { GoogleIcon, FacebookIcon } from './SocialButton';
import { MOCK_USER_EMAIL, MOCK_USER_PASSWORD, MOCK_ADMIN_EMAIL, MOCK_ADMIN_PASSWORD, MOCK_WORKER_EMAIL, MOCK_WORKER_PASSWORD, APP_NAME } from '../../constants';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, loading, user } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const loggedInUser = await login(email, password);
    if (loggedInUser) {
      // Navigation is handled by App.tsx based on user role via Navigate component.
      // No explicit navigate here to avoid conflicts with App.tsx's logic.
      // If App.tsx redirects correctly, this page won't be shown to logged-in users.
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };
  
  const handlePrefillMock = (role: 'user' | 'admin' | 'worker') => {
    switch (role) {
        case 'admin':
            setEmail(MOCK_ADMIN_EMAIL);
            setPassword(MOCK_ADMIN_PASSWORD);
            break;
        case 'worker':
            setEmail(MOCK_WORKER_EMAIL);
            setPassword(MOCK_WORKER_PASSWORD);
            break;
        case 'user':
        default:
            setEmail(MOCK_USER_EMAIL);
            setPassword(MOCK_USER_PASSWORD);
            break;
    }
  };


  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    // Placeholder for social login logic
    alert(`${provider} login is not implemented yet.`);
    // In a real app, this would redirect to OAuth provider
  };
  
  // If user is already logged in, App.tsx should redirect them away from /login.
  // This is an additional safeguard or can be removed if App.tsx handles it robustly.
  // useEffect(() => {
  //   if (user) {
  //     if (user.isAdmin) navigate('/admin/overview');
  //     else if (user.isWorker) navigate('/worker/overview');
  //     else navigate('/dashboard/overview');
  //   }
  // }, [user, navigate]);


  return (
    <AuthForm
      title={`Sign in to your ${APP_NAME} account`}
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
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </Link>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full" isLoading={loading} disabled={loading}>
        Sign in
      </Button>
       <Button type="button" variant="outline" className="w-full mt-2" onClick={() => handlePrefillMock('user')}>
        Use Demo Account (User)
      </Button>
      <Button type="button" variant="outline" className="w-full mt-2" onClick={() => handlePrefillMock('worker')}>
        Use Demo Account (Worker)
      </Button>
      <Button type="button" variant="outline" className="w-full mt-2" onClick={() => handlePrefillMock('admin')}>
        Use Demo Account (Admin)
      </Button>
      <div className="text-sm text-center mt-4">
        Not a member?{' '}
        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
          Register here
        </Link>
      </div>
       <div className="text-sm text-center mt-4">
        <Link to="/marketing/home" className="font-medium text-secondary-600 hover:text-secondary-500">
          &larr; Back to Fundy Home
        </Link>
      </div>
    </AuthForm>
  );
};

export default LoginPage;
