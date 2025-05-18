import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateMoveDto } from './dto/create-move.dto';
import { IGameController } from 'app/game/interfaces';
import { HttpResponse } from 'common/http-response';
import { GenericApiResponse } from 'decorators/generic-api-response.decorator';

@ApiTags('game')
@ApiBearerAuth('access-token')
@Controller('game')
export class GameController implements IGameController {
  constructor(private readonly _gameService: GameService) {}

  /**
   * ============================ create =================================
   */
  @ApiOperation({ summary: 'Create a new game' })
  @GenericApiResponse({
    status: HttpStatus.CREATED,
    description: 'Game created successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Post()
  async create(@Body() data: CreateGameDto): Promise<HttpResponse<void>> {
    await this._gameService.createGame(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create game successfully',
    };
  }

  /**
   * ============================ update =================================
   */
  @ApiOperation({ summary: 'Update an existing game' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'Game updated successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateGameDto
  ): Promise<HttpResponse<void>> {
    await this._gameService.updateGame(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update game successfully',
    };
  }

  /**
   * ============================ addMove =================================
   */
  @ApiOperation({ summary: 'Add a move to the game' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Move added successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Post(':id/move')
  async addMove(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateMoveDto
  ): Promise<HttpResponse<void>> {
    const move = Object.assign(data, { gameId: id });

    await this._gameService.addMove(move);

    return {
      statusCode: HttpStatus.OK,
      message: 'Add move to game success!',
    };
  }
}
