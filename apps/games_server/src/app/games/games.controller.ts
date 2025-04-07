import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';

@Controller('games')
@UseGuards(WsJwtGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async createGame(@Body('playerId') playerId: string) {
    return this.gamesService.createGame(playerId);
  }

  @Get(':id')
  async getGame(@Param('id') id: string) {
    return this.gamesService.getGame(id);
  }
} 