import { forgotPasswordService } from 'game_caro_package/services/auth.service';
import { TActionResult } from 'game_caro_package/types';
import {
  forgotPasswordSchema,
  handleZodValidation,
} from 'game_caro_package/validators';
import { ActionFunctionArgs } from 'react-router-dom';

export async function forgotPasswordAction({
  request,
}: ActionFunctionArgs): Promise<TActionResult<'OK'>> {
  // Extract form data from the request
  const formData = await request.formData();
  const data = {
    email: formData.get('email')?.toString().trim(),
  };

  // Validate the email format
  const { validationErrors, data: validatedData } = handleZodValidation(
    forgotPasswordSchema,
    data
  );

  if (validationErrors) {
    return {
      validationErrors,
    };
  }

  // Call forgot password service
  const result = await forgotPasswordService(validatedData.email);

  if (result && 'error' in result) {
    return {
      serverError: result.error,
    };
  }

  return { data: 'OK' };
}
