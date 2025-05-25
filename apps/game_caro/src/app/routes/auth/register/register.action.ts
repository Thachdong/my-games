import { registerService } from 'game_caro/services/auth.service';
import { EPagePath } from 'game_caro/utils/constant';
import {
  handleZodValidation,
  registerSchema,
  TRegisterForm,
} from 'game_caro/validators';
import { ActionFunctionArgs } from 'react-router-dom';
import { TActionResult } from 'game_caro/types';

export async function registerAction({
  request,
}: ActionFunctionArgs): Promise<TActionResult<'OK'>> {
  // Parse and validate the form data
  const formData = await request.formData();

  const data: TRegisterForm = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const { validationErrors } = handleZodValidation(registerSchema, data);

  if (validationErrors) {
    return {
      validationErrors,
    };
  }

  // Call the register service
  // const { error } = await registerService(data);

  // // Call the register service failed
  // if (error) {
  //   return {
  //     serverError: typeof error === 'string' ? error : error.messages
  //   };
  // }

  // Call the register service successfully, redirect to login page

  return {
    data: 'OK',
  };
}
