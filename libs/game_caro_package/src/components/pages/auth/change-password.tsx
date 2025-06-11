import {
  Button,
  ErrorMessage,
  Input,
} from 'game_caro_package/components/atoms';
import { InputPassword } from 'game_caro_package/components/atoms/form-tags/input-password';
import { useToast } from 'game_caro_package/context-api';
import { useCustomActionData } from 'game_caro_package/hooks';
import { pagePaths } from 'game_caro_package/libs';
import { useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';

export const ChangePasswordPage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (data === 'OK') {
      toast('Password changed successfully, please log in again!');
      navigate(pagePaths.login);
    }
  }, [data, navigate, toast]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Change Password</h1>

      <ErrorMessage
        className="text-center"
        errors={serverError}
        id="server-error"
      />

      <Form method="post">
        <Input
          autoFocus
          label="Email"
          type="email"
          name="email"
          errors={validationErrors?.email}
        />

        <Input
          label="Confirmation hash"
          name="confirmHash"
          errors={validationErrors?.currentPassword}
        />

        <InputPassword
          label="Password"
          name="password"
          errors={validationErrors?.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="repeatPassword"
          errors={validationErrors?.repeatPassword}
        />
        <Button className="w-full mt-4" type="submit">
          CHANGE PASSWORD
        </Button>
      </Form>

      <p className="text-center mt-4">
        Remembered your password?{' '}
        <Link to={pagePaths.login} className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link
          to={pagePaths.forgotPassword}
          className="text-blue-500 hover:underline"
        >
          Forgot your password?
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to={pagePaths.register} className="text-blue-500 hover:underline">
          Register a new account
        </Link>
      </p>
    </div>
  );
};
