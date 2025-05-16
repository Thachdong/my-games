import { ResetPasswordDto } from './../dto/reset-password.dto';
import { GetUserDto } from 'app/user/dto/get-user.dto';
import { RegisterDto } from 'app/auth/dto/register.dto';
import { HttpResponse } from 'common/http-response';

export interface IAuthConroller {
  /**
   * Name: register
   * Description: Register a new user
   * @param data: RegisterDto - The registration data
   * @returns Registered user data
   * Exceptions:
   * - 201: User registration successful
   * - 400: Invalid user data
   */
  register(data: RegisterDto): Promise<HttpResponse<GetUserDto>>;

  /**
   * Name: login
   * Description: User login to the game
   * @implements
   * - Passport local strategy (validate user credentials: email and password and isActive)
   * - JWT token generation
   * @param req: LoginDto - The login data
   * @returns Authenticated user data
   * Exceptions:
   * - 200: Login successful
   * - 401: Unauthorized access
   */
  login(
    data: Request & { user: GetUserDto }
  ): Promise<HttpResponse<GetUserDto | void>>;

  /**
   * Name: logout
   * Description: User logout from the game
   * @returns void
   * Exceptions:
   * - 200: Logout successful
   * - 400: Bad request
   */
  logout(): Promise<HttpResponse<void>>;

  /**
   * Name: activate new account
   * Description: Activate a new account
   * @param token: string - The JWT token for activation (includ: userId)
   * @returns void
   * Exceptions:
   * - 200: User activation successful
   * - 400: Token has expired
   * - 401: Unauthorized access
   */
  activate(token: string): Promise<HttpResponse<void>>;

  /**
   * Name: Reset password
   * Description: Reset user password
   * @body ResetPasswordDto - The reset password data
   * @returns void
   */
  resetPassword(data: ResetPasswordDto): Promise<HttpResponse<void>>;
}
