import { Repository } from 'typeorm';
import { ChatService } from './chat.service';
import { Room, ChatRoomType, Message } from './entities';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'app/user/entities/user.entity';

describe('ChatService', () => {
  let roomRepository: Repository<Room>;
  let messageRepository: Repository<Message>;
  let chatService: ChatService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getRepositoryToken(Room),
          useClass: Repository<Room>,
        },
        {
          provide: getRepositoryToken(Message),
          useClass: Repository<Message>,
        },
      ],
    }).compile();

    roomRepository = module.get<Repository<Room>>(
      getRepositoryToken(Room)
    );
    messageRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message)
    );
    chatService = module.get<ChatService>(ChatService);
  });

  describe('Test chat service is defined', () => {
    it('should be defined', () => {
      expect(chatService).toBeDefined();
    });
  });
  describe('Test method createChatRoom', () => {
    it('should create a chat room', async () => {
      const roomData = {
        name: 'Test Room',
        description: 'Test Description',
        type: ChatRoomType.PUBLIC,
      };

      const room = new Room();
      room.messages = [];
      Object.assign(room, roomData);

      jest.spyOn(roomRepository, 'create').mockReturnValue(room);
      jest.spyOn(roomRepository, 'save').mockResolvedValue(room);

      const result = await chatService.createChatRoom(roomData);

      expect(result).toEqual(room);
      expect(roomRepository.create).toHaveBeenCalledWith(roomData);
      expect(roomRepository.save).toHaveBeenCalledWith(room);
    });
  });
  describe('Test method createMessage', () => {
    it('should create a message', async () => {
      const messageData = {
        roomId: 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c',
        userId: 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5d',
        content: 'Test Message',
      };
      const user = new User();
      user.id = messageData.userId;
      user.username = 'TestUser';

      const message = new Message();
      Object.assign(message, messageData);

      jest.spyOn(messageRepository, 'create').mockReturnValue(message);
      jest.spyOn(messageRepository, 'save').mockResolvedValue(message);
      jest.spyOn(messageRepository, 'findOne').mockResolvedValue({
        ...message,
        user,
      });

      const result = await chatService.createMessage(messageData);

      expect(result.content).toEqual(message.content);
      expect(messageRepository.create).toHaveBeenCalledWith(messageData);
      expect(messageRepository.save).toHaveBeenCalledWith(message);
    });
  });
  describe('Test method getChatRooms', () => {
    it('should return paginated chat rooms', async () => {
      const page = 1;
      const limit = 10;
      const room1 = new Room();
      room1.messages = [];
      const room2 = new Room();
      room2.messages = [];
      const rooms = [room1, room2];

      jest.spyOn(roomRepository, 'findAndCount').mockResolvedValue([rooms, 2]);

      const result = await chatService.getChatRooms(page, limit);

      expect(result.page).toEqual(page);
      expect(result.limit).toEqual(limit);
      expect(result.total).toEqual(2);
      expect(result.data.length).toEqual(2);
    });
    it('should return paginated with empty chat rooms', async () => {
      const page = 1;
      const limit = 10;
      const rooms: Room[] = [];

      jest.spyOn(roomRepository, 'findAndCount').mockResolvedValue([rooms, 0]);

      const result = await chatService.getChatRooms(page, limit);

      expect(result.page).toEqual(page);
      expect(result.limit).toEqual(limit);
      expect(result.total).toEqual(0);
      expect(result.data.length).toEqual(0);
    });
  });
  describe('Test method getChatRoom', () => {
    it('should return a chat room', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      const room = new Room();
      room.id = roomId;
      room.messages = [];

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);

      const result = await chatService.getChatRoom(roomId);

      expect(result).toEqual(room);
      expect(roomRepository.findOne).toHaveBeenCalledWith({
        where: { id: roomId },
        relations: ['messages'],
      });
    });

    it('should throw an error if room not found', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(null);

      await expect(chatService.getChatRoom(roomId)).rejects.toThrow(
        `Chat room with ID ${roomId} not found`
      );
    });
  });
  describe('Test method getChatRoomMessages', () => {
    it('should return paginated chat room messages', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      const page = 1;
      const limit = 10;
      const message1 = new Message();
      message1.roomId = roomId;
      message1.content = 'Test Message 1';
      const message2 = new Message();
      message2.roomId = roomId;
      message2.content = 'Test Message 2';
      const messages = [message1, message2];

      jest
        .spyOn(messageRepository, 'findAndCount')
        .mockResolvedValue([messages, 2]);

      const result = await chatService.getChatRoomMessages(roomId, page, limit);

      expect(result.page).toEqual(page);
      expect(result.limit).toEqual(limit);
      expect(result.total).toEqual(2);
      expect(result.data.length).toEqual(2);
    });
    it('should throw an error if no messages found', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      const page = 1;
      const limit = 10;

      jest.spyOn(messageRepository, 'findAndCount').mockResolvedValue([[], 0]);

      await expect(
        chatService.getChatRoomMessages(roomId, page, limit)
      ).rejects.toThrow(`No messages found for chat room with ID ${roomId}`);
    });
  });
  describe('Test method deleteChatRoom', () => {
    it('should delete a chat room', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      const room = new Room();

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);
      jest.spyOn(roomRepository, 'delete').mockResolvedValue(undefined);

      await chatService.deleteChatRoom(roomId);

      expect(roomRepository.findOne).toHaveBeenCalledWith({
        where: { id: roomId },
      });
      expect(roomRepository.delete).toHaveBeenCalledWith(roomId);
    });

    it('should throw an error if room not found', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(null);

      await expect(chatService.deleteChatRoom(roomId)).rejects.toThrow(
        `Chat room with ID ${roomId} not found`
      );
    });
  });
  describe('Test method updateChatRoomName', () => {
    it('should update a chat room name', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      const newName = 'Updated Room Name';
      const room = new Room();
      room.id = roomId;
      room.name = 'Old Room Name';

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(room);
      jest.spyOn(roomRepository, 'save').mockResolvedValue({
        ...room,
        name: newName,
      });

      const result = await chatService.updateChatRoomName(roomId, newName);

      expect(result.name).toEqual(newName);
      expect(roomRepository.findOne).toHaveBeenCalledWith({
        where: { id: roomId },
      });
      expect(roomRepository.save).toHaveBeenCalledWith({
        ...room,
        name: newName,
      });
    });

    it('should throw an error if room not found', async () => {
      const roomId = 'b3e1c2a4-5d6f-4e7a-8b9c-0d1e2f3a4b5c';
      const newName = 'Updated Room Name';

      jest.spyOn(roomRepository, 'findOne').mockResolvedValue(null);

      await expect(
        chatService.updateChatRoomName(roomId, newName)
      ).rejects.toThrow(`Chat room with ID ${roomId} not found`);
    });
  });
});
