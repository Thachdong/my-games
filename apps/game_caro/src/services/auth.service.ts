import { TLoginForm, TRegisterForm } from 'game_caro/validators';
import api, { apiEndpoints } from './api-service';
import { createService } from 'game_caro/hocs/create-service';

export type TRegisterService = typeof registerService;

const handleRegister = async (data: TRegisterForm) => {
  const response = await api.post<TRegisterForm, null>(apiEndpoints.register.path, data);
  return response.data;
};

export const registerService = createService(handleRegister);

const handleLogin = async (data: TLoginForm) => {
  const response = await api.post<TLoginForm, null>(apiEndpoints.login.path, data);
  return response.data;
}

export const loginService = createService<TLoginForm, null>(handleLogin);
