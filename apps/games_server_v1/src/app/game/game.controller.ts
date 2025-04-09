import {
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
export class GameController {
  /**
   * Create a new game
   */
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Game created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data provided' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
  @Post()
  create() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Update an existing game
   */
  @ApiOperation({ summary: 'Update an existing game' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Game updated successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data provided' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
  @Patch(':id')
  update() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  /**
   * Add a move to the game
   */
  @ApiOperation({ summary: 'Add a move to the game' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Move added successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data provided' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized access' })
  @Post([':id', 'move'])
  addMove() {
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
