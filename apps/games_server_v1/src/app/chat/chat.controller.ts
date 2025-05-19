import { ChatService } from 'app/chat/chat.service';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IChatController } from 'app/chat/interfaces';
import { GenericApiResponse } from 'decorators';
import { GetChatRoomDto, GetMessageDto } from 'app/chat/dto';
import { HttpResponse } from 'common/http-response';

@ApiTags('chat')
@ApiBearerAuth('access-token')
@Controller('chat')
export class ChatController implements IChatController {
  constructor(private readonly _chatService: ChatService) {}

  /**
   * ============================ getChatRooms =================================
   */
  @ApiOperation({
    summary: 'Get chat rooms with pagination',
  })
  @GenericApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Return chat rooms with pagination',
    },
    [GetChatRoomDto]
  )
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of chat rooms per page',
  })
  @Get('/rooms')
  async getChatRooms(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<HttpResponse<GetChatRoomDto[]>> {
    const { data, ...meta } = await this._chatService.getChatRooms(page, limit);

    return {
      statusCode: HttpStatus.OK,
      message: 'Chat rooms retrieved successfully',
      data,
      meta,
    };
  }

  /**
   * ============================ getChatRoom =================================
   */
  @ApiOperation({
    summary: 'Get chat room by ID',
  })
  @GenericApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Return chat room by ID',
    },
    [GetChatRoomDto]
  )
  @GenericApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat room not found',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({ name: 'roomId', description: 'Chat room ID' })
  @Get('/rooms/:roomId')
  async getChatRoom(
    @Param('roomId', ParseUUIDPipe) roomId: string
  ): Promise<HttpResponse<GetChatRoomDto>> {
    const chatRoom = await this._chatService.getChatRoom(roomId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Chat room retrieved successfully',
      data: chatRoom,
    };
  }

  /**
   * ============================ getChatRoomMessages =================================
   */
  @ApiOperation({
    summary: 'Get chat room messages with pagination',
  })
  @GenericApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Return chat room messages with pagination',
    },
    [GetChatRoomDto]
  )
  @GenericApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Chat room not found',
  })
  @GenericApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiParam({ name: 'roomId', description: 'Chat room ID' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit number of messages per page',
  })
  @Get('/rooms/:roomId/messages')
  async getChatRoomMessages(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Query('page', ParseUUIDPipe) page?: number,
    @Query('limit', ParseUUIDPipe) limit?: number
  ): Promise<HttpResponse<GetMessageDto[]>> {
    const { data, ...meta } = await this._chatService.getChatRoomMessages(
      roomId,
      page,
      limit
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Chat room messages retrieved successfully',
      data,
      meta,
    };
  }
}
