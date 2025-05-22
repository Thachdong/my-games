import { Button, Input } from 'game_caro_ui/components/atoms';
import { Form } from 'react-router-dom';
import { useCustomActionData } from 'game_caro/hooks/useCustomActionData';

export const RegisterPage = () => {
  const { validationErrors, serverError, data } = useCustomActionData();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <Form method="post" className="max-w-md mx-auto">
        <Input label="Username" name="username" />
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <div className="text-center">
          <Button type="submit">REGISTER</Button>
        </div>
      </Form>
    </div>
  );
};
