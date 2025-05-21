import { TRegister } from 'game_caro/types/auth-service';
import api from './api-service';

export async function registerService(data: TRegister) {
  return api.post('/auth/register', data).then(res => res).catch(error => error)
}
