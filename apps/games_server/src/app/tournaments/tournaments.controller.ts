import { Controller, Get, Post, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';

@Controller('tournaments')
@UseGuards(WsJwtGuard)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  async createTournament(@Body('name') name: string, @Body('creatorId') creatorId: string) {
    return this.tournamentsService.createTournament(name, creatorId);
  }

  @Get(':id')
  async getTournament(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentsService.getTournament(id);
  }
} 