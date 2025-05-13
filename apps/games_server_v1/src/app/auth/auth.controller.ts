import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { HttpResponse } from '../../common/http-response';
import { AuthService } from './auth.service';
import { GenericApiResponse } from 'decorators/generic-api-response.decorator';
import { AuthenticatedUserDto } from 'app/auth/dto/authenticated-user.dto';
import { GetUserDto } from 'app/user/dto/get-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // #region -- Register --
  @ApiOperation({ summary: 'Register a user' })
  @GenericApiResponse(
    { description: 'User registration successful', status: HttpStatus.CREATED },
    AuthenticatedUserDto
  )
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user data',
  })
  @Post('register')
  async register(@Body() data: RegisterDto): Promise<HttpResponse<GetUserDto>> {
    const user = await this._authService.register(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: user,
    };
  }
  // #endregion

  // #region -- Login --
  @ApiOperation({ summary: 'User login to the game' })
  @GenericApiResponse(
    { status: HttpStatus.OK, description: 'Login successful' },
    AuthenticatedUserDto
  )
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
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
  // #endregion

  // #region -- Logout --
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
  // #endregion

  // #region -- Activate Account --
  @ApiOperation({ summary: 'Activate a new account' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'User activation successful',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Token has expired',
  })
  @Post('activate/:token')
  async activate(@Param('token') token: string): Promise<HttpResponse<void>> {
    await this._authService.activate(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'User activated successfully',
    };
  }
  // #endregion
}
