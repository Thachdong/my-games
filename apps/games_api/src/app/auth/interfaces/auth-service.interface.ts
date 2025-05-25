import { GetUserDto } from "app/user/dto/get-user.dto";
import { AuthenticatedUserDto } from "../dto/authenticated-user.dto";
import { RegisterDto, ChangePasswordDto, ActivateDto } from "app/auth/dto";

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
  login(user: GetUserDto, startAt: number): Promise<AuthenticatedUserDto | void>;

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
  activate(data: ActivateDto): Promise<void>;

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
   * Description: Change password
   * @param data: ChangePasswordDto
   * implements
   * - Check if user exists
   * - Check if confirmation hash is matching the verification token
   * - Update user password
   * @returns Promise<void>
   * Exceptions:
   * - 400: User with email does not exist
   * - 400: Invalid confirmation hash
   */
  changePassword(data: ChangePasswordDto): Promise<void>;

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
