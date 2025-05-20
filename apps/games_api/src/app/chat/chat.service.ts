import { IChatService } from 'app/chat/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage, ChatRoom } from 'app/chat/entities';
import { Repository } from 'typeorm';
import {
  CreateChatRoomDto,
  CreateMessageDto,
  GetChatRoomDto,
  GetMessageDto,
} from 'app/chat/dto';
import { IPaginate } from 'types';
import { PAGE_SIZE } from 'common/constants';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly _roomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatMessage)
    private readonly _messageRepository: Repository<ChatMessage>
  ) {}

  async createChatRoom(data: CreateChatRoomDto): Promise<GetChatRoomDto> {
    const room = this._roomRepository.create(data);

    const savedRoom = await this._roomRepository.save(room);

    return { ...savedRoom, messages: [] };
  }

  async createMessage(data: CreateMessageDto): Promise<GetMessageDto> {
    const message = this._messageRepository.create(data);

    await this._messageRepository.save(message);

    const { user, ...savedMessage } = await this._messageRepository.findOne({
      where: { id: message.id },
      relations: ['user'],
    });

    return {
      ...savedMessage,
      sender: { id: user.id, username: user.username },
    };
  }

  async getChatRooms(
    page?: number,
    limit?: number
  ): Promise<IPaginate<GetChatRoomDto>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * take;

    const [rooms, total] = await this._roomRepository.findAndCount({
      relations: ['messages'],
      take,
      skip,
    });

    return {
      page: page || 1,
      limit: take,
      total,
      data: rooms.map((room) => ({
        ...room,
        messages: room.messages.map((message) => ({
          ...message,
          sender: { ...message.user },
        })),
      })),
    };
  }

  async getChatRoom(roomId: string): Promise<GetChatRoomDto> {
    const room = await this._roomRepository.findOne({
      where: { id: roomId },
      relations: ['messages'],
    });

    if (!room) {
      throw new HttpException(
        `Chat room with ID ${roomId} not found`,
        HttpStatus.NOT_FOUND
      );
    }

    return {
      ...room,
      messages: room.messages.map((message) => ({
        ...message,
        sender: { ...message.user },
      })),
    };
  }

  async getChatRoomMessages(
    roomId: string,
    page?: number,
    limit?: number
  ): Promise<IPaginate<GetMessageDto>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * take;

    const [messages, total] = await this._messageRepository.findAndCount({
      where: { roomId },
      relations: ['user'],
      take,
      skip,
    });

    if (!messages.length) {
      throw new HttpException(
        `No messages found for chat room with ID ${roomId}`,
        HttpStatus.NOT_FOUND
      );
    }

    return {
      page: page || 1,
      limit: take,
      total,
      data: messages.map((message) => ({
        ...message,
        sender: { ...message.user },
      })),
    };
  }

  async deleteChatRoom(roomId: string): Promise<void> {
    const room = await this._roomRepository.findOne({ where: { id: roomId } });

    if (!room) {
      throw new HttpException(
        `Chat room with ID ${roomId} not found`,
        HttpStatus.NOT_FOUND
      );
    }

    await this._roomRepository.delete(roomId);
  }

  async updateChatRoomName(
    roomId: string,
    name: string
  ): Promise<GetChatRoomDto> {
    const room = await this._roomRepository.findOne({ where: { id: roomId } });

    if (!room) {
      throw new HttpException(
        `Chat room with ID ${roomId} not found`,
        HttpStatus.NOT_FOUND
      );
    }

    room.name = name;

    const updatedRoom = await this._roomRepository.save(room);

    return {
      ...updatedRoom,
      messages:
        updatedRoom.messages?.map((message) => ({
          ...message,
          sender: { ...message.user },
        })) || [],
    };
  }
}
