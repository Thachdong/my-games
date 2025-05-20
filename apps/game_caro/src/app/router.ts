import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './auth/layout';
import LoginPage from './auth/login/login-page';
import RegisterPage from './auth/register/register-page';
import HomePage from './home/home-page';
import GamePage from './game/game-page';
import TournamentPage from './tournament/tournament-page';
import ProfilePage from './profile/profile-page';

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
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
    ],
  },
  {
    id: 'home',
    path: '/',
    Component: HomePage,
  },
  {
    id: 'game',
    path: '/game',
    Component: GamePage,
  },
  {
    id: 'tournament',
    path: '/tournament',
    Component: TournamentPage,
  },
  {
    id: 'profile',
    path: '/profile',
    Component: ProfilePage,
  },
]);
