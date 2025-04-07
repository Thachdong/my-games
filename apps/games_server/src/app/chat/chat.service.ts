import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom, ChatRoomType } from './entities/chat-room.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async getRoomMessages(roomId: string): Promise<ChatMessage[]> {
    const room = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      relations: ['messages', 'messages.sender'],
    });

    if (!room) {
      throw new NotFoundException(`Chat room with ID ${roomId} not found`);
    }

    return room.messages;
  }

  async createMessage(
    roomId: string,
    userId: string,
    createMessageDto: CreateMessageDto,
  ): Promise<ChatMessage> {
    const room = await this.chatRoomRepository.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException(`Chat room with ID ${roomId} not found`);
    }

    const message = this.chatMessageRepository.create({
      roomId,
      senderId: userId,
      content: createMessageDto.content,
    });

    return this.chatMessageRepository.save(message);
  }

  async createRoom(name: string, type: ChatRoomType, gameId?: string): Promise<ChatRoom> {
    const room = this.chatRoomRepository.create({
      name,
      type,
      gameId,
    });

    return this.chatRoomRepository.save(room);
  }

  async getRoom(roomId: string): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      relations: ['messages', 'messages.sender'],
    });

    if (!room) {
      throw new NotFoundException(`Chat room with ID ${roomId} not found`);
    }

    return room;
  }

  async getGameRoom(gameId: string): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findOne({
      where: { gameId },
    });

    if (!room) {
      return this.createRoom(`Game ${gameId} Chat`, ChatRoomType.GAME, gameId);
    }

    return room;
  }
} 