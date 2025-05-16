import {
  Controller,
  Get,
  HttpStatus,
  Patch,
  Query,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GenericApiResponse } from '../../decorators/generic-api-response.decorator';
import { HttpResponse } from '../../common/http-response';

@ApiTags('user')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiOperation({ summary: 'Get users with paginate' })
  @ApiParam({ name: 'page', description: 'Page number for pagination', required: false })
  @ApiParam({ name: 'limit', description: 'Limit number of users per page', required: false })
  @GenericApiResponse(
    { status: 200, description: 'Return user with paginate' },
    [GetUserDto]
  )
  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ): Promise<HttpResponse<GetUserDto[]>> {
    const paginate = await this._userService.getAll(page, limit);

    return {
      statusCode: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data: paginate.data,
      meta: {
        total: paginate.total,
        page: paginate.page,
        limit: paginate.limit,
      },
    };
  }

  /**
   * Get user by id
   * Authorize by: [admin, owner]
   */
  @ApiOperation({ summary: 'Get user by Id' })
  @GenericApiResponse(
    { status: 200, description: 'Return the user' },
    GetUserDto
  )
  @GenericApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User Id' })
  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<HttpResponse<GetUserDto>> {
    const user = await this._userService.getUserById(id);

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: user,
    };
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
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @Patch('profile')
  async update(
    @Body() data: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<HttpResponse<null>> {
    await this._userService.updateUser(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: null,
    };
  }
}
