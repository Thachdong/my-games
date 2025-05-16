import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { HttpResponse } from '../../common/http-response';
import { AuthService } from './auth.service';
import { GenericApiResponse } from 'decorators/generic-api-response.decorator';
import { AuthenticatedUserDto } from 'app/auth/dto/authenticated-user.dto';
import { GetUserDto } from 'app/user/dto/get-user.dto';
import { Public } from 'app/auth/decorators/public.decorator';
import { LoginDto } from 'app/auth/dto/login.dto';
import { LocalAuthGuard } from 'app/auth/guards/local-auth.guard';
import { ResetPasswordDto } from 'app/auth/dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  /**
   * Name: register
   * Description: Register a new user
   * @param data: RegisterDto - The registration data
   * @returns Registered user data
   * Exceptions:
   * - 201: User registration successful
   * - 400: Invalid user data
   */
  @ApiOperation({ summary: 'Register a user' })
  @GenericApiResponse(
    { description: 'User registration successful', status: HttpStatus.CREATED },
    AuthenticatedUserDto
  )
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user data',
  })
  @Public()
  @Post('register')
  async register(@Body() data: RegisterDto): Promise<HttpResponse<GetUserDto>> {
    const user = await this._authService.register(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: user,
    };
  }

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
  @ApiOperation({ summary: 'User login to the game' })
  @ApiBody({ type: LoginDto })
  @GenericApiResponse(
    { status: HttpStatus.OK, description: 'Login successful' },
    AuthenticatedUserDto
  )
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<HttpResponse<AuthenticatedUserDto | void>> {
    const user = req.user;

    const authenticatedUser = await this._authService.login(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: authenticatedUser,
    };
  }

  /**
   * Name: logout
   * Description: User logout from the game
   * @returns void
   * Exceptions:
   * - 200: Logout successful
   * - 400: Bad request
   */
  @ApiOperation({ summary: 'User logout from the game' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'Logout successful',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('logout')
  async logout() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

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
  @ApiOperation({ summary: 'Activate a new account' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'User activation successful',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Token has expired',
  })
  @Public()
  @Get('activate/:token')
  async activate(@Param('token') token: string): Promise<HttpResponse<void>> {
    await this._authService.activate(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'User activated successfully',
    };
  }

  /**
   * Name: Reset password
   * Description: Reset user password
   * @body ResetPasswordDto - The reset password data
   * @returns void
   */
  @GenericApiResponse({ status: HttpStatus.OK, description: 'Password reset successful' })
  @GenericApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid reset password data' })
  @Public()
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto): Promise<HttpResponse<void>> {
    await this._authService.resetPassword(data);

    return {
      statusCode: HttpStatus.OK,
      message: 'Password reset successful',
    };
  }
}
