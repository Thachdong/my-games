import {
  loginService,
  TAuthenticatedUser,
} from 'game_caro_package/services/auth.service';
import {
  ELocalStorageKeys,
  setLocalStorageService,
} from 'game_caro_package/services/localstorage.service';
import { TActionResult } from 'game_caro_package/types';
import {
  handleZodValidation,
  loginSchema,
  TLoginForm,
} from 'game_caro_package/validators';
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
}: ActionFunctionArgs): Promise<TActionResult<TAuthenticatedUser>> {
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
  const result = await loginService(data);

  if ('error' in result) {
    return {
      serverError: result.error,
    };
  }

  if ('data' in result) {
    setLocalStorageService(ELocalStorageKeys.AUTHENTICATED_USER, result.data);
  }

  return {
    data: result,
  };
}
