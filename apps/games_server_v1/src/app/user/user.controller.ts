import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  /**
   * Find all user
   * Authorize by: [admin]
   */
  @ApiOperation({ summary: 'Get users with paginate' })
  @ApiResponse({ status: 200, description: 'Return user with paginate' })
  @Get()
  findAll() {
    return [];
  }

  /**
   * Get user by id
   * Authorize by: [admin, owner]
   */
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiResponse({ status: 200, description: 'Return the user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User Id' })
  @Get(':id')
  findById() {
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  /**
   * Update user profile
   * Authorize by: [admin, owner]
   */
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User update successfully',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data' })
  @Patch('profile')
  update() {
    throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
  }
}
