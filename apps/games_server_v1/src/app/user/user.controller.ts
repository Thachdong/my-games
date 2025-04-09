import {
  Controller,
  Get,
  HttpStatus,
  Patch,
  Query,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
  Body
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  /**
   * Find all user
   * Authorize by: [admin]
   */
  @ApiOperation({ summary: 'Get users with paginate' })
  @ApiResponse({ status: 200, description: 'Return user with paginate', type: GetUserDto })
  @Get()
  async findAll(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
    return this._userService.getAll(page, limit);
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
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this._userService.getUserById(id)
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
  update(@Body() data: UpdateUserDto, @Param('id', ParseUUIDPipe) id: string) {
    return this._userService.updateUser(id, data)
  }
}
