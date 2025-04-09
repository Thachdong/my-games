import {
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tournament')
@Controller('tournament')
export class TournamentController {
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
  create() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Update tournament
   */
  @ApiOperation({ summary: 'Update tournament (player join / leave, title)' })
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
  @Patch(':id')
  updateTournament() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
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
  @Put(':id')
  updateRank() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
