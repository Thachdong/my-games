import { registerService } from 'game_caro/services/auth.service';
import {
  handleZodValidation,
  registerSchema,
  TRegisterForm,
} from 'game_caro/validators';
import { ActionFunctionArgs } from 'react-router-dom';
import { TActionResult } from 'game_caro/types';

/**
 * Handle user registration
 * @implements
 * - Collect form data from the request
 * - Validate the data using Zod schema
 * - Call the registration service
 * - Return appropriate action result
 * @returns 
 */
export async function registerAction({
  request,
}: ActionFunctionArgs): Promise<TActionResult<'OK'>> {
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

  const { error } = await registerService(data);

  if (error) {
    return {
      serverError: typeof error === 'string' ? error : error.messages
    };
  }

  return {
    data: 'OK',
  };
}
