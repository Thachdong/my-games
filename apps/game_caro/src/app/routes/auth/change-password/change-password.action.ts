import { changePasswordService } from 'game_caro_package/services/auth.service';
import { TActionResult } from 'game_caro_package/types';
import {
  changePasswordSchema,
  handleZodValidation,
  TChangePasswordForm,
} from 'game_caro_package/validators';
import { ActionFunctionArgs } from 'react-router-dom';

export async function changePasswordAction({
  request,
}: ActionFunctionArgs): Promise<TActionResult<'OK'>> {
  // Extract form data from the request
  const formData = await request.formData();
  const data: TChangePasswordForm = {
    confirmHash: formData.get('confirmHash')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    password: formData.get('password')?.toString().trim() || '',
    repeatPassword: formData.get('repeatPassword')?.toString().trim() || '',
  };

  // Validate the data using Zod schema
  const { validationErrors, data: validatedData } = handleZodValidation(
    changePasswordSchema,
    data
  );

  if (validationErrors) {
    return {
      validationErrors,
    };
  }

  // Call the change password service
  const { error } = await changePasswordService({
    confirmHash: validatedData.confirmHash,
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    return {
      serverError: typeof error === 'string' ? error : error.messages,
    };
  }

  return { data: 'OK' };
}
