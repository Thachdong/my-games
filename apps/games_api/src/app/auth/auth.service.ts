import { ChangePasswordDto } from './dto/change-password.dto';
import { ActivateDto } from './dto/activate.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { GetUserDto } from '../user/dto/get-user.dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { MailerService } from 'app/mailer/mailer.service';
import { ChatService } from "app/chat/chat.service";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
    private readonly _mailerService: MailerService,
    private readonly _chatService: ChatService
  ) {}

  /**
   * Description: Generate verification token
   * @param: void
   * @returns: string
   * @example: 'abc123xyz456'
   */
  private _generateVerificationToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /**
   * Description: Hashing password
   * @param password: string
   * @returns Promise<string>
   */
  private async _hashPassword(password: string): Promise<string> {
    const SALT_ROUND = 10;

    return await bcrypt.hash(password, SALT_ROUND);
  }

  /**
   * Description: Generate jwt token
   * @param userId
   * @param email
   * @returns Promise<string>
   */
  private async _generateJwtToken(
    userId: string,
    email: string,
    iat: number
  ): Promise<string> {
    const payload = { sub: userId, email, iat };

    return await this._jwtService.sign(payload);
  }

  async register(data: RegisterDto): Promise<GetUserDto> {
    // Check if user already exists
    const existingUser = await this._userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new HttpException(
        `User with email (${data.email}) already exists`,
        HttpStatus.BAD_REQUEST
      );
    }

    // Hash password
    const hashedPassword = await this._hashPassword(data.password);

    // Create user
    const verificationToken = this._generateVerificationToken();

    const user = this._userRepository.create({
      ...data,
      password: hashedPassword,
      verificationToken,
    });

    await this._userRepository.save(user);

    // Send verification email
    try {
      await this._mailerService.sendActivateEmail(
        user.email,
        verificationToken
      );
    } catch (error) {
      Logger.log(JSON.stringify(error));
    }
    delete user.password;

    return user;
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<GetUserDto | null> {
    const user = await this._userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    delete user['password'];

    return user;
  }

  async login(
    user: GetUserDto,
    startAt: number
  ): Promise<AuthenticatedUserDto | void> {
    const accessToken = await this._generateJwtToken(
      user.id,
      user.email,
      startAt
    );

    const publicRoomId = await this._chatService.getPublicRoomId();

    return {
      accessToken,
      publicRoomId,
      ...user,
    };
  }

  async logout(accessToken: string): Promise<void> {
    console.log(`Token invalidated: ${accessToken}`);
  }

  async activate({ email, verificationCode }: ActivateDto): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.verificationToken !== verificationCode) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    user.isEmailVerified = true;
    user.verificationToken = null;
    user.isActive = true;

    await this._userRepository.save(user);
  }

  async forgotPassword(email: string): Promise<void> {
    // Verify if user exists
    const user = await this._userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        `User with email (${email}) not found`,
        HttpStatus.NOT_FOUND
      );
    }

    if (user.isActive === false) {
      throw new HttpException(
        'User is not active, verify email and activate your account first',
        HttpStatus.FORBIDDEN
      );
    }

    // Send email with reset password link
    const resetToken = this._generateVerificationToken();

    user.verificationToken = resetToken;

    await this._userRepository.save(user);

    await this._mailerService.sendResetPasswordEmail(user.email, resetToken);
  }

  async getUserById(id: string): Promise<GetUserDto | void> {
    const user = await this._userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        `User with ID "${id}" does not exist!`,
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }

  async changePassword(data: ChangePasswordDto) {
    const user = await this._userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException(
        `User with email "${data.email}" does not exist!`,
        HttpStatus.NOT_FOUND
      );
    }

    if (user.verificationToken !== data.confirmHash) {
      throw new HttpException(
        'Invalid confirmation hash',
        HttpStatus.BAD_REQUEST
      );
    }

    user.password = await this._hashPassword(data.password);

    await this._userRepository.save(user);
  }
}
