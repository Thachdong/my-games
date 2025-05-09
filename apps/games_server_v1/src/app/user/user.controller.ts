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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GenericApiResponse } from '../../decorators/generic-api-response.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  /**
  @GenericApiResponse(GetUserDtoArray, { status: 200, description: 'Return user with paginate' })
   * Authorize by: [admin]
   */
  @ApiOperation({ summary: 'Get users with paginate' })
  @GenericApiResponse({ status: 200, description: 'Return user with paginate' }, [ GetUserDto ])
  @Get()
  async findAll(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
    return this._userService.getAll(page, limit);
  }

  /**
   * Get user by id
   * Authorize by: [admin, owner]
   */
  @ApiOperation({ summary: 'Get user by Id' })
  @GenericApiResponse({ status: 200, description: 'Return the user' }, GetUserDto)
  @GenericApiResponse({ status: 404, description: 'User not found' })
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
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'User update successfully',
  })
  @GenericApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @GenericApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data' })
  @Patch('profile')
  update(@Body() data: UpdateUserDto, @Param('id', ParseUUIDPipe) id: string) {
    return this._userService.updateUser(id, data)
  }
}
