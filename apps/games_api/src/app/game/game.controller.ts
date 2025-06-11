import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateMoveDto } from './dto/create-move.dto';
import { IGameController } from 'app/game/interfaces';
import { HttpResponse } from 'common/http-response';
import { GenericApiResponse } from 'decorators/generic-api-response.decorator';
import { GameDto } from 'app/game/dto';
import { JwtPayload } from 'app/auth/decorators';
import { TJwtPayload } from 'types';

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
  async create(
    @Body() data: CreateGameDto,
    @JwtPayload() payload: TJwtPayload
  ): Promise<HttpResponse<void>> {
    Logger.log('CurrentUser: ', JSON.stringify(payload));

    await this._gameService.createGame(data, payload.sub);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create game successfully',
    };
  }

  /**
   * ============================ getAll =================================
   */
  @ApiOperation({ summary: 'Get all game' })
  @GenericApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Games retrieved successfully',
    },
    [GameDto]
  )
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit number for pagination',
    required: false,
  })
  @Get()
  async getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ): Promise<HttpResponse<GameDto[]>> {
    const { data, ...meta } = await this._gameService.getAllGame(page, limit);

    return {
      statusCode: HttpStatus.OK,
      message: 'Get all games successfully',
      data,
      meta,
    };
  }

  /**
   * ============================ getGameById =================================
   */
  @ApiOperation({ summary: 'Get game by id' })
  @GenericApiResponse(
    { status: HttpStatus.OK, description: 'Get game by id successfully' },
    GameDto
  )
  @GenericApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Can not find game',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @ApiParam({ name: 'id', description: 'Game id', required: true })
  @Get(':id')
  async getGameById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<HttpResponse<GameDto>> {
    const game = await this._gameService.getGameById(id);

    if (!game) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Game with id (${id}) not found`,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Get Game by id successfully',
      data: game,
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
  @GenericApiResponse({
    status: HttpStatus.CREATED,
    description: 'Move added successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @GenericApiResponse({
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

  /**
   * ============================ joinGame =================================
   */
  @ApiOperation({ summary: "User join a game"})
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'User joined successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @Post(':id/join')
  async join(
    @Param('id', ParseUUIDPipe) gameId: string,
    @JwtPayload() jwtPayload: TJwtPayload
  ): Promise<HttpResponse<void>> {
    await this._gameService.joinGame(gameId, jwtPayload.sub);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success!',
    };
  }
}
