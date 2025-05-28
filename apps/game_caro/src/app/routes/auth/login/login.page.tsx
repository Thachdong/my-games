import { LoginPage as Page } from 'game_caro_package/components/pages/auth/login';
import { useAuth } from 'game_caro_package/context-api/auth.context';
import { useCustomActionData } from 'game_caro_package/hooks';
import { pagePaths } from 'game_caro_package/libs';
import { TAuthenticatedUser } from 'game_caro_package/services/auth.service';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { data: userData } = useCustomActionData<TAuthenticatedUser>();

  /**
   * Check is user authenticated
   */
  useEffect(() => {
    if (user) {
      navigate(pagePaths.home);
    }
  }, [user, navigate]);

  /**
   * Catch login form response
   */
  useEffect(() => {
    if (userData) {
      login(userData);
    }
  }, [userData, login]);

  return <Page />;
}
