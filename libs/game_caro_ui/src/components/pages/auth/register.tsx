import { Button, ErrorMessage, Input } from 'game_caro_ui/components/atoms';
import { useCustomActionData } from 'game_caro_ui/hooks';
import { useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === 'OK') {
      navigate('/auth/login');
    }
  }, [data, navigate]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

      <ErrorMessage className='text-center' errors={serverError} id="server-error" />

      <Form method="post" className="w-full max-w-md mx-auto">
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
        <Input
          label="Password"
          type="password"
          name="password"
          errors={validationErrors?.password}
        />
        <div className="text-center">
          <Button type="submit">REGISTER</Button>
        </div>
      </Form>
    </div>
  );
};
