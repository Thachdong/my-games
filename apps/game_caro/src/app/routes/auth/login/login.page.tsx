import { LoginPage as Page } from 'game_caro_package/components/pages/auth/login';
import { useAuth } from 'game_caro_package/context-api/auth.context';
import { pagePaths } from 'game_caro_package/libs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(pagePaths.home)
    }
  }, [isAuthenticated, navigate])

  return <Page />;
}
