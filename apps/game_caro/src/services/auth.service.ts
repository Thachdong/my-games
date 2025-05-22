import { TRegisterForm } from 'game_caro/validators';
import api from './api-service';
import { AxiosError } from 'axios';

export type TRegisterService = typeof registerService;

export async function registerService(
  data: TRegisterForm
) {
  try {
    await api.post('/auth/register', data);

    return {
      data: null,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data,
      };
    }
    return {
      error: error,
    };
  }
}
