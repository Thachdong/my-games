import { GetUserDto } from 'app/user/dto/get-user.dto';
import { HttpResponse } from 'common/http-response';
import { Response } from 'express';
import {
  ActivateDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  RegisterDto,
} from 'app/auth/dto';

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
    authenticatedUser: GetUserDto,
    res: Response
  ): Promise<HttpResponse<GetUserDto | void>>;

  /**
   * Name: logout
   * Description: User logout from the game
   * @returns void
   * Exceptions:
   * - 200: Logout successful
   * - 400: Bad request
   */
  logout(res: Response): Promise<HttpResponse<void>>;

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
  activate(data: ActivateDto): Promise<HttpResponse<void>>;

  /**
   * Name: Forgot password
   * Description: Send reset password email
   * @param email: string - The user's email
   * @implements
   * - Check if the user with the provided email exists
   * - Send reset password code to the user's email
   * @returns void
   * Exceptions:
   * - 400: Invalid email format
   * - 404: User not found
   * - 403: User is not active
   */
  forgotPassword(data: ForgotPasswordDto): Promise<HttpResponse<void>>;

  /**
   * Name: Change password
   * Description: Change user password
   * @param data: ResetPasswordDto - The change password data
   * @returns void
   * Exceptions:
   * - 400: Invalid password format
   * - 404: User not found
   * - 409: Old password is incorrect
   */
  changePassword(data: ChangePasswordDto): Promise<HttpResponse<void>>;
}
