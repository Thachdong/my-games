import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { IAuthConroller } from 'app/auth/interfaces/auth-controller.interface';
import { CurrentUser } from 'app/auth/decorators';
import { Response } from 'express';

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
    description: 'User is not active, verify email and activate your account first',
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

    res.cookie('startAt', startAt, { httpOnly: true, secure: true, sameSite: 'strict' });

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
    res.clearCookie('startAt', { httpOnly: true, secure: true, sameSite: 'strict' });

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
   * ============================ resetPassword =================================
   */
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successful',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid reset password data',
  })
  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body() data: ResetPasswordDto
  ): Promise<HttpResponse<void>> {
    await this._authService.resetPassword(data);

    return {
      statusCode: HttpStatus.OK,
      message: 'Password reset successful',
    };
  }
}
