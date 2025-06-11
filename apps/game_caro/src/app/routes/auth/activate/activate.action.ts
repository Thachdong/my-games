import { activateService } from 'game_caro_package/services/auth.service';
import { TActionResult } from 'game_caro_package/types';
import {
  activateSchema,
  handleZodValidation,
  TActivateForm,
} from 'game_caro_package/validators';
import { ActionFunctionArgs } from 'react-router-dom';

export async function activateAction({
  request,
}: ActionFunctionArgs): Promise<TActionResult<'OK'>> {
  const formData = await request.formData();

  const data: TActivateForm = {
    email: formData.get('email') as string,
    verificationCode: formData.get('verificationCode') as string,
  };

  const { validationErrors } = handleZodValidation(activateSchema, data);

  if (validationErrors) {
    return {
      validationErrors,
    };
  }

  const result = await activateService(data);

  if (result && 'error' in result) {
    return {
      serverError: result.error,
    };
  }

  return {
    data: 'OK',
  };
}
