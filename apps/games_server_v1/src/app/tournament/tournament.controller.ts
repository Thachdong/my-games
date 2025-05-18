import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import {
  UpdateTournamentTitleDto,
  TournamentPlayerDto,
  GetTournamentDto,
} from 'app/tournament/dto';
import { ITournamentController } from 'app/tournament/interfaces';
import { HttpResponse } from 'common/http-response';

@ApiTags('tournament')
@ApiBearerAuth('access-token')
@Controller('tournament')
export class TournamentController implements ITournamentController {
  constructor(private readonly _tournamentService: TournamentService) {}

  /**
   * ============================ create =================================
   */
  @ApiOperation({ summary: 'Create tournament' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tournament created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only admin users can create tournaments',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Post()
  async create(
    @Body() data: CreateTournamentDto
  ): Promise<HttpResponse<GetTournamentDto>> {
    const tournament = await this._tournamentService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tournamnet created successfully',
      data: tournament,
    };
  }

  /**
   * ============================ GetAll =================================
   */
  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tournament retrieved successfully',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit number of users per page',
    required: false,
  })
  @Get()
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ): Promise<HttpResponse<GetTournamentDto[]>> {
    const { data, ...meta } = await this._tournamentService.getAll(page, limit);

    return {
      statusCode: HttpStatus.OK,
      message: 'Tournament retrieved successfully',
      data,
      meta,
    };
  }

  /**
   * ============================ updateTournamentTitle =================================
   */
  @ApiOperation({ summary: 'Update tournament (title)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tournament updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access forbidden',
  })
  @Patch(':id/title')
  async updateTournamentTitle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTournamentTitleDto
  ): Promise<HttpResponse<void>> {
    await this._tournamentService.updateTitle(id, data.title);

    return {
      statusCode: HttpStatus.OK,
      message: 'Tournament title updated successfully',
    };
  }

  /**
   * ============================ playerJoin =================================
   */
  @ApiOperation({ summary: 'Player join tournament' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tournament updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access forbidden',
  })
  @Patch(':id/join')
  async playerJoin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: TournamentPlayerDto
  ): Promise<HttpResponse<void>> {
    await this._tournamentService.playerJoin(id, data.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Player join tournament successfully',
    };
  }

  /**
   * ============================ playerLeave =================================
   */
  @ApiOperation({ summary: 'Update tournament (title)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tournament updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access forbidden',
  })
  @Patch(':id/leave')
  async playerLeave(
    @Param('id', ParseUUIDPipe) id: string,
    data: TournamentPlayerDto
  ) {
    await this._tournamentService.playerLeave(id, data.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Player leave tournament successfully',
    };
  }
}
