import { registerService } from 'game_caro_package/services/auth.service';
import {
  handleZodValidation,
  registerSchema,
  TRegisterForm,
} from 'game_caro_package/validators';
import { ActionFunctionArgs } from 'react-router-dom';
import { TActionResult } from 'game_caro_package/types';

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

  const result = await registerService(data);

  if (result && 'error' in result) {
    return {
      serverError: result.error,
    };
  }

  return {
    data: 'OK',
  };
}
