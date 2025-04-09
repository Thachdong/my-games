import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
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
  register() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
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
