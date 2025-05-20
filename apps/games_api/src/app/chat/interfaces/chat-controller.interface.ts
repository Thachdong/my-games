import { GetChatRoomDto, GetMessageDto } from 'app/chat/dto';
import { HttpResponse } from 'common/http-response';

export interface IChatController {
  /**
   * Description: Get chat rooms
   * @param page - optional - The page number to retrieve
   * @param limit - optional - The number of items per page
   * @returns Promise<HttpResponse<GetChatRoomDto>> - List of chat rooms
   */
  getChatRooms: (
    page?: number,
    limit?: number
  ) => Promise<HttpResponse<GetChatRoomDto[]>>;

  /**
   * Description: Get a specific chat room by ID
   * @param roomId - The ID of the chat room to retrieve
   * @returns Promise<HttpResponse<GetChatRoomDto>> - The chat room object
   * @throws {NotFoundException} - If the chat room is not found
   */
  getChatRoom: (roomId: string) => Promise<HttpResponse<GetChatRoomDto>>;

  /**
   * Description: Get and paginate messages in a chat room
   * @param roomId - The ID of the chat room to retrieve messages from
   * @param page - optional - The page number to retrieve
   * @param limit - optional - The number of items per page
   * @returns Promise<HttpResponse<GetChatRoomDto[]>> - List of messages in the chat room
   * @throws {NotFoundException} - If the chat room is not found
   */
  getChatRoomMessages: (
    roomId: string,
    page?: number,
    limit?: number
  ) => Promise<HttpResponse<GetMessageDto[]>>;
}
