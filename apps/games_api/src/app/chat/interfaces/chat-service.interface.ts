import { IPaginate } from 'types';
import {
  CreateChatRoomDto,
  CreateMessageDto,
  GetChatRoomDto,
  GetMessageDto,
} from 'app/chat/dto';

export interface IChatService {
  /**
   * Description: Create a new chat room
   * @param data - CreateChatRoomDto - The data for the new chat room
   * @returns Promise<GetChatRoomDto> - The created chat room object
   * @throws {BadRequestException} - If the chat room name is invalid
   */
  createChatRoom: (data: CreateChatRoomDto) => Promise<GetChatRoomDto>;

  /**
   * Description: Create a new message in a chat room
   * @param data - CreateMessageDto - The data for the new message
   * @returns Promise<GetMessageDto> - The created message object
   * @throws {NotFoundException} - If the chat room is not found
   */
  createMessage: (data: CreateMessageDto) => Promise<GetMessageDto>;

  /**
   * Description: Get and paginate chat rooms
   * @param {number} page - optional - The page number to retrieve
   * @param {number} limit - optinal - The number of items per page
   * @returns Promise<IPaginate<GetChatRoomDto>> - List of chat rooms
   */
  getChatRooms: (
    page?: number,
    limit?: number
  ) => Promise<IPaginate<GetChatRoomDto>>;

  /**
   * Description: Get a specific chat room by ID
   * @param roomId - The ID of the chat room to retrieve
   * @returns Promise<GetChatRoomDto> - The chat room object
   * @throws {NotFoundException} - If the chat room is not found
   */
  getChatRoom: (roomId: string) => Promise<GetChatRoomDto>;

  /**
   * Description: Get and paginate messages in a chat room
   * @param roomId - The ID of the chat room to retrieve messages from
   * @param page - optional - The page number to retrieve
   * @param limit - optional - The number of items per page
   * @returns Promise<IPaginate<GetMessageDto>> - List of messages in the chat room
   * @throws {NotFoundException} - If the chat room is not found
   */
  getChatRoomMessages: (
    roomId: string,
    page?: number,
    limit?: number
  ) => Promise<IPaginate<GetMessageDto>>;

  /**
   * Description: Delete a chat room by ID
   * @param roomId - UUID of the chat room to delete
   * @throws {NotFoundException} - If the chat room is not found
   * @returns Promise<void>
   */
  deleteChatRoom: (roomId: string) => Promise<void>;

  /**
   * Description: Update the name of a chat room
   * @param roomId - The ID of the chat room to update
   * @param name - The new name for the chat room
   * @returns Promise<void> - The updated chat room object
   * @throws {NotFoundException} - If the chat room is not found
   * @throws {BadRequestException} - If the chat room name is invalid
   * @throws {ConflictException} - If the chat room name already exists
   */
  updateChatRoomName: (roomId: string, name: string) => Promise<GetChatRoomDto>;

  /**
   * Description: Get public roomId
   * @implements
   * - Get public roomId
   * - if not exists, create a new public room and return its ID
   * @returns Promise<string> - The ID of the public chat room
   */
  getPublicRoomId(): Promise<string>;
}
