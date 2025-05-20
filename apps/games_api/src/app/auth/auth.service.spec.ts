import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
jest.mock('bcrypt');
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should hash the password and save the user', async () => {
      const registerDto: RegisterDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword';
      const user = { ...registerDto, password: hashedPassword };
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(user as User);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user as User);

      const result = await service.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...registerDto,
        password: hashedPassword,
        verificationToken: expect.any(String),
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('validateUser', () => {
    it('should return user if email and password are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { email, password: 'hashedPassword' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user as User);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await service.validateUser(email, password);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(result).toEqual(user);
    });

    it('should return null if email is invalid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.validateUser('invalid@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const user = { email: 'test@example.com', password: 'hashedPassword' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user as User);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      const result = await service.validateUser('test@example.com', 'wrongPassword');

      expect(result).toBeNull();
    });
  });

  describe('activate', () => {
    it('should activate the user if token is valid', async () => {
      const token = 'validToken';
      const payload = { sub: 'userId' };
      const user = { id: 'userId', verificationToken: token, isEmailVerified: false };

      jest.spyOn(jwtService, 'decode').mockReturnValueOnce(payload);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user as User);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user as User);

      await service.activate(token);

      expect(jwtService.decode).toHaveBeenCalledWith(token);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: payload.sub } });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...user,
        isEmailVerified: true,
        verificationToken: null,
      });
    });

    it('should throw an exception if user is not found', async () => {
      const token = 'invalidToken';
      const payload = { sub: 'userId' };

      jest.spyOn(jwtService, 'decode').mockReturnValueOnce(payload);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.activate(token)).rejects.toThrow(HttpException);
    });
  });
});
