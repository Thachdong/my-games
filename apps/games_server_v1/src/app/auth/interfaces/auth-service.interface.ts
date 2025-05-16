import { GetUserDto } from "app/user/dto/get-user.dto";
import { RegisterDto } from "../dto/register.dto";
import { AuthenticatedUserDto } from "../dto/authenticated-user.dto";

export interface IAuthService {
  /**
   * Description: Register a new user
   * @param data: RegisterDto
   * @implements
   * - Hash password
   * - Create user
   * - Send verification email
   * @returns Promise<GetUserDto>
   */
  register(data: RegisterDto): Promise<GetUserDto>;

  /**
   * Description: Login
   * @param user: GetUserDto
   * @implements
   * - Generate jwt token
   * @returns Promise<AuthenticatedUserDto | void>
   */
  login(user: GetUserDto): Promise<AuthenticatedUserDto | void>;

  /**
   * TODO: Implement logout
   * @param accessToken
   */
  logout(accessToken: string): Promise<void>;

  /**
   * Description: Verify email
   * @param token: string
   * @implements
   * - Check if user exists
   * - Check if token is valid
   * - Update user isEmailVerified to true
   * @returns Promise<void>
   * Exceptions:
   * - 400: User with ID does not exist
   * - 401: Unauthorized access
   */
  activate(userId: string, token: string): Promise<void>;

  /**
   * Description: Forgot password
   * @param email: string
   * @implements
   * - Check if user exists
   * - Generate reset password token
   * - Send email with reset password link
   * @returns Promise<void>
   * Exceptions:
   * - 400: User with email does not exist
   */
  forgotPassword(email: string): Promise<void>;

  /**
   * Description: Reset password
   * @param resetPasswordToken: string
   * @implements
   * - Check if user exists
   * - Generate random password
   * - Hash password
   * - Update user password
   * @returns Promise<string>
   * Exceptions:
   * - 400: User with ID does not exist
   */
  resetPassword(resetPasswordToken: string): Promise<string>;
  /**
   * Description: Validate user
   * @param email: string
   * @param password : string
   * @implements
   * - Check if user exists
   * - Check if password is valid
   * @returns Promise<User | null>
   */
  validateUser(email: string, password: string): Promise<GetUserDto | null>;

  /**
   * Description: Get user by id
   * @param id: string
   * @implements
   * - Check if user exists
   * @returns Promise<GetUserDto | void>
   * Exceptions:
   * - 400: User with ID does not exist
   */
  getUserById(id: string): Promise<GetUserDto | void>;
}
