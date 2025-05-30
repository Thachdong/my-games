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
import { Form, useNavigate, Link } from 'react-router-dom';

export const LoginPage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (data === 'OK') {
      navigate(pagePaths.home);
    }
  }, [data, navigate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <ErrorMessage
        className="text-center"
        errors={serverError}
        id="server-error"
      />

      <Form method="post">
        <Input
          label="Email"
          type="email"
          name="email"
          errors={validationErrors?.email}
        />
        <InputPassword
          label="Password"
          name="password"
          errors={validationErrors?.password}
        />
        <Button className="w-full mt-4" type="submit">
          LOGIN
        </Button>
      </Form>

      <p className="text-center mt-4">
        Don't have an account?{' '}
        <Link to={pagePaths.register} className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to={pagePaths.activate} className="text-blue-500 hover:underline">
          Activate your account
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

      <button onClick={() => toast('test')}>toast</button>
    </div>
  );
};
