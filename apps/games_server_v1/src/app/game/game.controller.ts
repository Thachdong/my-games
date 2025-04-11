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
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateMoveDto } from './dto/create-move.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly _gameService: GameService) {}
  /**
   * Create a new game
   */
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Game created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Post()
  create(@Body() data: CreateGameDto) {
    this._gameService.createGame(data);
  }

  /**
   * Update an existing game
   */
  @ApiOperation({ summary: 'Update an existing game' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Game updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateGameDto) {
    this._gameService.updateGame(id, data);
  }

  /**
   * Add a move to the game
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
  addMove(@Param('id', ParseUUIDPipe) id: string, @Body() data: CreateMoveDto) {
    const move = Object.assign(data, { gameId: id });

    this._gameService.addMove(move);
  }
}
