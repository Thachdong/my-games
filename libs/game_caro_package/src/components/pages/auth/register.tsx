import { Button, ErrorMessage, Input } from 'game_caro_package/components/atoms';
import { InputPassword } from 'game_caro_package/components/atoms/form-tags/input-password';
import { useCustomActionData } from 'game_caro_package/hooks';
import { pagePaths } from 'game_caro_package/libs';
import { useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === 'OK') {
      navigate(pagePaths.activate);
    }
  }, [data, navigate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

      <ErrorMessage
        className="text-center"
        errors={serverError}
        id="server-error"
      />

      <Form method="post">
        <Input
          label="Username"
          name="username"
          errors={validationErrors?.username}
        />
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
          REGISTER
        </Button>
      </Form>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to={pagePaths.login} className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to={pagePaths.activate} className="text-blue-500 hover:underline">
          Activate your account
        </Link>
      </p>
    </div>
  );
};
