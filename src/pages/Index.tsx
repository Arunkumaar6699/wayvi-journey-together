
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    
    if (isAuthenticated && user) {
      if (!user.isProfileComplete) {
        navigate('/complete-profile');
      } else {
        navigate('/home');
      }
    } else {
      navigate('/');
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  // This component will redirect, so we show the splash screen
  return null;
};

export default Index;
