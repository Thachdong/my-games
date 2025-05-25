import { loginService } from 'game_caro/services/auth.service';
import {
  ELocalStorageKeys,
  setLocalStorageService,
} from 'game_caro/services/localstorage.service';
import { TActionResult } from 'game_caro/types';
import {
  handleZodValidation,
  loginSchema,
  TLoginForm,
} from 'game_caro/validators';
import { ActionFunctionArgs } from 'react-router-dom';

/**
 * Handle user login
 * @implements
 * - Collect form data from the request
 * - Validate the data using Zod schema
 * - Call the login service
 * * @returns
 * - Return appropriate action result
 */
export async function loginAction({
  request,
}: ActionFunctionArgs): Promise<TActionResult<'OK'>> {
  const formData = await request.formData();

  const data: TLoginForm = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate the data using Zod schema
  const { validationErrors } = handleZodValidation(loginSchema, data);

  if (validationErrors) {
    return {
      validationErrors,
    };
  }

  // Call the login service
  const { error, data: authenticatedUser } = await loginService(data);

  if (error) {
    return {
      serverError: typeof error === 'string' ? error : error.messages,
    };
  }

  if (authenticatedUser) {
    setLocalStorageService(
      ELocalStorageKeys.AUTHENTICATED_USER,
      authenticatedUser
    );
  }

  return {
    data: 'OK',
  };
}
