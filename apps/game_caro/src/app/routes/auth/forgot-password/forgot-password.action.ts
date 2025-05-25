import { forgotPasswordService } from 'game_caro/services/auth.service';
import { TActionResult } from 'game_caro/types';
import {
  forgotPasswordSchema,
  handleZodValidation,
} from 'game_caro/validators';
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
  const { error } = await forgotPasswordService(validatedData.email);

  if (error) {
    return {
      serverError: typeof error === 'string' ? error : error.messages,
    };
  }

  return { data: 'OK' };
}
