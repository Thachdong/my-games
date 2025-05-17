import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from 'app/user/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from './dto/update-user.dto';
describe('UserService', () => {
  // Prepare the test suite for UserService
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>('UserRepository');
  });

  // Test case for updating a user
  describe('test is user service defined', () => {
    it('User service should be defined', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('test method updateUser', () => {
    const userId = '1';
    const updateUserDto: UpdateUserDto = {
      username: 'Updated Name',
    };

    const user = new User();
    user.username = 'Old Name';
    user.id = userId;

    const updatedUser: User = {
      ...user,
      ...updateUserDto,
    };
    it('should update username successfully', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(updatedUser);

      const result = await userService.updateUser(userId, updateUserDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(userRepository.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        userService.updateUser(userId, updateUserDto)
      ).rejects.toThrow();
    });
  });

  describe('test method getUserById', () => {
    const userId = '1';
    const user = new User();
    it('should return user by id', async () => {
      user.id = '1';

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.getUserById(userId);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });

      expect(result).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      user.id = '2';

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(userService.getUserById(userId)).rejects.toThrow()
    });
  });

  describe('test method getAll', () => {
    let users: User[] = [];
    const take = 25;
    const skip = 0;
    it('should return all users', async () => {
      users.push(new User());
      const totalRecord = 1;

      jest
        .spyOn(userRepository, 'findAndCount')
        .mockResolvedValue([users, totalRecord]);

      const result = await userService.getAll();

      expect(userRepository.findAndCount).toHaveBeenCalledWith({ take, skip });

      expect(result.data.length).toEqual(totalRecord);
    });

    it('should return empty array of users', async () => {
      users = [];
      jest.spyOn(userRepository, 'findAndCount').mockResolvedValueOnce([[], 0]);

      const result = await userService.getAll();

      expect(userRepository.findAndCount).toHaveBeenCalledWith({ take, skip });

      expect(result.data.length).toEqual(0);
    });
  });
});
