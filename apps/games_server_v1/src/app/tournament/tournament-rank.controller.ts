import { UpdateTournamentRankDto } from './dto/update-tournament-rank.dto';
import { ITournamentRankController } from 'app/tournament/interfaces';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TournamentRankService } from 'app/tournament/tournament-rank.service';
import { GenericApiResponse } from 'decorators';
import { HttpResponse } from 'common/http-response';
import {
  CreateTournamentRankDto,
  GetTournamentRankDto,
} from 'app/tournament/dto';

@ApiTags('Tournament-rank')
@Controller('tournament-rank')
export class TournamentRankController implements ITournamentRankController {
  constructor(private readonly _service: TournamentRankService) {}

  /**
   * ============================ create =================================
   */
  @ApiOperation({ summary: 'Create tournament rank' })
  @GenericApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create rank successfully',
  })
  @GenericApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  async create(
    @Body() data: CreateTournamentRankDto
  ): Promise<HttpResponse<GetTournamentRankDto>> {
    const rank = await this._service.createRank(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create rank successfully',
      data: rank,
    };
  }

  /**
   * ============================ updateRank =================================
   */
  @ApiOperation({ summary: 'Update tournament ranking' })
  @GenericApiResponse({
    status: HttpStatus.OK,
    description: 'Ranking updated successfully',
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
  async updateRank(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTournamentRankDto
  ): Promise<HttpResponse<null>> {
    await this._service.updateRank(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: 'Update rank success',
    };
  }
}
