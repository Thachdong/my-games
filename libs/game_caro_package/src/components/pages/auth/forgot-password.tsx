import { Button, ErrorMessage, Input } from 'game_caro_package/components/atoms';
import { useCustomActionData } from 'game_caro_package/hooks';
import { pagePaths } from 'game_caro_package/libs';
import { Form, Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const { validationErrors, serverError, data } = useCustomActionData<'OK'>();

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>

      {data === 'OK' && (
        <p className="text-green-500 text-center mb-4">
          We send a password reset to your email. Please check your inbox. And
          visit{' '}
          <Link
            to={pagePaths.changePassword}
            className="text-blue-500 hover:underline"
          >
            change your password page to complete the process.
          </Link>
        </p>
      )}

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

        <Button type="submit" className="w-full mt-4">
          RESET PASSWORD
        </Button>
      </Form>

      <p className="text-center mt-4">
        Remembered your password?{' '}
        <Link to={pagePaths.login} className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to={pagePaths.register} className="text-blue-500 hover:underline">
          Register a new account
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link
          to={pagePaths.changePassword}
          className="text-blue-500 hover:underline"
        >
          Change your password
        </Link>
      </p>
    </div>
  );
};
