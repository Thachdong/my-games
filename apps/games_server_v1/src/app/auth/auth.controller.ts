import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { HttpResponse } from '../../common/http-response';
import { GetUserDto } from '../user/dto/get-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  /**
   * Register
   */
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registration successful',
  })
  @ApiResponse({
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
    }
  }

  /**
   * Login
   */
  @ApiOperation({ summary: 'User login to the game' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
  @Post('login')
  login() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Logout
   */
  @ApiOperation({ summary: 'User logout from the game' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logout successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post('logout')
  logout() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Activate
   */
  @ApiOperation({ summary: 'Activate a new account' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User activation successful',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Token has expired',
  })
  @Post('activate/:token')
  activate() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
