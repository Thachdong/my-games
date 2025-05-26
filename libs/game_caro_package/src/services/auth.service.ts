import { TActivateForm, TLoginForm, TRegisterForm } from 'game_caro_package/validators';
import api from './api-service';
import { apiEndpoints } from 'game_caro_package/services/api-service';
import { createService } from 'game_caro_package/hocs/create-service';

/**
 * ====================== Register Service ======================
 */
export type TRegisterService = typeof registerService;

const handleRegister = async (data: TRegisterForm) => {
  const response = await api.post<TRegisterForm, null>(
    apiEndpoints.register.path,
    data
  );
  return response.data;
};

export const registerService = createService(handleRegister);

/**
 * ====================== Login Service ======================
 */
export type TAuthenticatedUser = {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  roles: string[];
  avatar?: string;
  score: number;
  gamePlayed: number;
  gameWon: number;
  gameLost: number;
  gameDraw: number;
  accessToken: string;
}

const handleLogin = async (data: TLoginForm) => {
  const response = await api.post<TLoginForm, TAuthenticatedUser>(
    apiEndpoints.login.path,
    data
  );
  return response.data;
};

export const loginService = createService<TLoginForm, TAuthenticatedUser>(handleLogin);

/**
 * ====================== Activate Service ======================
 */
const handleActivate = async (data: TActivateForm) => {
  const response = await api.post<TActivateForm, null>(
    apiEndpoints.activate.path,
    data
  );
  return response.data;
};

export const activateService = createService<TActivateForm, null>(handleActivate);

/**
 * ====================== Forgot Password Service ======================
 */
const handleForgotPassword = async (email: string) => {
  const response = await api.post<{ email: string }, null>(
    apiEndpoints.forgotPassword.path,
    { email }
  );
  return response.data;
}
export const forgotPasswordService = createService(handleForgotPassword);

/**
 * ====================== Change Password Service ======================
 */
type TChangePasswordServiceParameters = {
  email: string;
  confirmHash: string;
  password: string;
}

const handleChangePassword = async (data: TChangePasswordServiceParameters) => {
  const response = await api.post<TChangePasswordServiceParameters, null>(
    apiEndpoints.changePassword.path,
    data
  );
  return response.data;
}
export const changePasswordService = createService(handleChangePassword);