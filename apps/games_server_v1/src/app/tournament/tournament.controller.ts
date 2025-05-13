import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import {
  UpdateTournamentTitleDto,
  TournamentPlayerDto,
} from './dto/update-tournament.dto';
import { UpdateTournamentRankDto } from './dto/update-tournament-rank.dto';

@ApiTags('tournament')
@Controller('tournament')
export class TournamentController {
  constructor(private readonly _tournamentService: TournamentService) {}

  /**
   * Create tournament
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
  create(@Body() data: CreateTournamentDto) {
    this._tournamentService.create(data);
  }

  /**
   * Update tournament
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
  updateTournament(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTournamentTitleDto
  ) {
    this._tournamentService.updateTitle(id, data.title);
  }

  /**
   * Update tournament
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
  playerJoin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: TournamentPlayerDto
  ) {
    this._tournamentService.playerJoin(id, data.userId);
  }

  /**
   * Update tournament
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
  playerLeave(
    @Param('id', ParseUUIDPipe) id: string,
    data: TournamentPlayerDto
  ) {
    this._tournamentService.playerLeave(id, data.userId);
  }

  /**
   * Update rank
   */
  @ApiOperation({ summary: 'Update tournament ranking' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ranking updated successfully',
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
  @Patch(':rankId/rank')
  updateRank(
    @Param('rankId', ParseUUIDPipe) id: string,
    @Body() data: UpdateTournamentRankDto
  ) {
    this._tournamentService.updateRank(id, data);
  }
}
