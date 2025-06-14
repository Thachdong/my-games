import { Form, Link, useNavigate } from 'react-router-dom';
import { useCustomActionData } from 'game_caro_package/hooks';
import { useEffect } from 'react';
import {
  Button,
  ErrorMessage,
  Input,
} from 'game_caro_package/components/atoms';
import { pagePaths } from 'game_caro_package/libs';
import { useToast } from 'game_caro_package/context-api';

export const ActivatePage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (data === 'OK') {
      toast('Account activated successfully, please log in!');
      navigate(pagePaths.login);
    }
  }, [data, navigate, toast]);

  return (
    <div className="w-full max-w-md mx-auto">
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
        <Link to={pagePaths.login} className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to={pagePaths.register} className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};
