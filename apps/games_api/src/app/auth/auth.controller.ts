import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '../../common/http-response';
import { AuthService } from './auth.service';
import { GenericApiResponse } from 'decorators/generic-api-response.decorator';
import { AuthenticatedUserDto } from 'app/auth/dto/authenticated-user.dto';
import { GetUserDto } from 'app/user/dto/get-user.dto';
import { Public } from 'app/auth/decorators/public.decorator';
import { LocalAuthGuard } from 'app/auth/guards/local-auth.guard';
import { IAuthConroller } from 'app/auth/interfaces/auth-controller.interface';
import { CurrentUser } from 'app/auth/decorators';
import { Response } from 'express';
import {
  ActivateDto,
  ChangePasswordDto,
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
} from 'app/auth/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController implements IAuthConroller {
  constructor(private readonly _authService: AuthService) {}

  /**
   * ============================ register =================================
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
   * ============================ login =================================
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
  @GenericApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'User is not active, verify email and activate your account first',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: GetUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<HttpResponse<AuthenticatedUserDto | void>> {
    const startAt = new Date().getTime();

    const authenticatedUser = await this._authService.login(user, startAt);

    res.cookie('startAt', startAt, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: authenticatedUser,
    };
  }

  /**
   * ============================ logout =================================
   */
  @ApiBearerAuth('access-token')
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
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('startAt', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Logout successful',
    };
  }

  /**
   * ============================ activate =================================
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
  @ApiBody({ type: ActivateDto })
  @Public()
  @Post('activate')
  async activate(@Body() data: ActivateDto): Promise<HttpResponse<void>> {
    await this._authService.activate(data);

    return {
      statusCode: HttpStatus.OK,
      message: 'User activated successfully',
    };
  }

  /**
   * ============================ forgotPassword =================================
   */
  @ApiOperation({ summary: 'Send reset password email' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password email sent successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email format',
  })
  @GenericApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Body() data: ForgotPasswordDto
  ): Promise<HttpResponse<void>> {
    await this._authService.forgotPassword(data.email);

    return {
      statusCode: HttpStatus.OK,
      message: 'Reset password email sent successfully',
    };
  }

  /**
   * ============================ changePassword =================================
   */
  @ApiOperation({ summary: 'Change user password' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'User password changed successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid password format',
  })
  @GenericApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Public()
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<HttpResponse<void>> {
    await this._authService.changePassword(changePasswordDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'User password changed successfully',
    };
  }
}
