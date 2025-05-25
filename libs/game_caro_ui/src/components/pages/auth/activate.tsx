import { Form, useNavigate } from 'react-router-dom';
import { useCustomActionData } from 'game_caro_ui/hooks';
import { useEffect } from 'react';
import { Button, ErrorMessage, Input } from 'game_caro_ui/components/atoms';
import { pagePaths } from 'game_caro_ui/libs';

export const ActivatePage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === 'OK') {
      navigate(pagePaths.login);
    }
  }, [data, navigate]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-6">Activate</h1>

      <ErrorMessage
        className="text-center"
        errors={serverError}
        id="server-error"
      />

      <Form method="post">
        <Input
          autoFocus
          label="Email"
          name="email"
          errors={validationErrors?.email}
        />

        <Input
          label="Activation Code"
          name="verificationCode"
          errors={validationErrors?.verificationCode}
        />

        <Button type="submit" className="w-full mt-4">
          ACTIVATE
        </Button>
      </Form>

      <p className="text-center mt-4">
        Already activated?{' '}
        <a href={pagePaths.login} className="text-blue-500 hover:underline">
          Login here
        </a>
      </p>
      
      <p className="text-center mt-2">
        <a href={pagePaths.register} className="text-blue-500 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};
