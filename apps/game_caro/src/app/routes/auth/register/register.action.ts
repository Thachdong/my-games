import { registerService } from 'game_caro/services/auth.service';
import { EPagePath } from 'game_caro/utils/constant';
import { registerValidator, TRegisterForm } from 'game_caro/validators';
import { ActionFunctionArgs, redirect } from 'react-router-dom';

export type TRegisterActionResult = {
  validationErrors?: Record<string, string[]>;
  serverError?: string;
  data?: null;
};

export async function registerAction({
  request,
}: ActionFunctionArgs): Promise<TRegisterActionResult> {
  const formData = await request.formData();

  const data: TRegisterForm = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const isValid = registerValidator.safeParse(data);

  if (!isValid.success) {
    return {
      validationErrors: isValid.error.formErrors.fieldErrors,
    };
  }

  const result = await registerService(data);

  if (result.error) {
    return {
      serverError: result.error,
    };
  }

  redirect(EPagePath.LOGIN);

  return {
    data: null,
  };
}
