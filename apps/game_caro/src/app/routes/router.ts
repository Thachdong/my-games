import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './auth/layout';
import { loginAction, LoginPage } from './auth/login';
import { registerAction, RegisterPage } from './auth/register';
import { homeAction, homeLoader, HomePage } from './home';
import { gameAction, gameLoader, GamePage } from './game';
import {
  tournamentAction,
  tournamentLoader,
  TournamentPage,
} from './tournament';
import { profileAction, profileLoader, ProfilePage } from './profile';
import { ActivatePage } from './auth/activate';
import {
  forgotPasswordAction,
  ForgotPasswordPage,
} from './auth/forgot-password';
import {
  changePasswordAction,
  ChangePasswordPage,
} from './auth/change-password';
import { activateAction } from './auth/activate/activate.action';
import { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
  // AUTH ROUTES
  {
    id: 'auth',
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        index: true,
        path: 'login',
        Component: LoginPage,
        action: loginAction,
      },
      {
        path: 'register',
        Component: RegisterPage,
        action: registerAction,
      },
      {
        path: 'activate',
        Component: ActivatePage,
        action: activateAction,
      },
      {
        path: 'forgot-password',
        Component: ForgotPasswordPage,
        action: forgotPasswordAction,
      },
      {
        path: 'change-password',
        Component: ChangePasswordPage,
        action: changePasswordAction,
      },
    ],
  },
  // PROTECTED ROUTE
  {
    id: 'protected',
    path: '/',
    Component: ProtectedRoute,
    children: [
      // HOME ROUTES
      {
        id: 'home',
        index: true,
        Component: HomePage,
        loader: homeLoader,
        action: homeAction,
      },
      // GAME ROUTES
      {
        id: 'game',
        path: '/game',
        Component: GamePage,
        action: gameAction,
        loader: gameLoader,
      },
      // TOURNAMENT ROUTES
      {
        id: 'tournament',
        path: '/tournament',
        Component: TournamentPage,
        action: tournamentAction,
        loader: tournamentLoader,
      },
      // PROFILE ROUTES
      {
        id: 'profile',
        path: '/profile',
        Component: ProfilePage,
        action: profileAction,
        loader: profileLoader,
      },
    ],
  },
]);
