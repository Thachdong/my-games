import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { TJwtPayload, TJwtPayloadForActivateAccount } from 'types/jwt';
import { ConfigService } from '@nestjs/config';
import { EConfigKeys } from 'common/constants';
import { ResetPasswordDto } from 'app/auth/dto/reset-password.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService
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
    email: string
  ): Promise<string> {
    const payload = { sub: userId, email };

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
    const payload: TJwtPayloadForActivateAccount = {
      sub: user.id,
      verificationToken,
    };

    const activateToken = await this._jwtService.sign(payload, {
      expiresIn: this._configService.get<string>('JWT_ACTIVATION_EXPIRES_IN'), // Token expiration time set to one year
    });

    const verificationLink = `http://localhost:3000/auth/activate/${activateToken}`;

    await this._mailerService.sendActivateEmail(user.email, verificationLink);

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

    delete user['password']

    return user;
  }

  async login(user: GetUserDto): Promise<AuthenticatedUserDto | void> {
    const accessToken = await this._generateJwtToken(user.id, user.email);

    return {
      accessToken,
      ...user,
    };
  }

  async logout(accessToken: string): Promise<void> {
    console.log(`Token invalidated: ${accessToken}`);
  }

  async activate(token: string): Promise<void> {
    const payload: TJwtPayloadForActivateAccount =
      await this._jwtService.decode(token);

    const user = await this._userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.verificationToken !== payload.verificationToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    user.isEmailVerified = true;
    user.verificationToken = null;

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

    // Send email with reset password link
    const payload: TJwtPayload = { sub: user.id, email: user.email };

    const resetToken = await this._jwtService.sign(payload, {
      expiresIn: this._configService.get<string>(
        EConfigKeys.JWT_RESET_PASSWORD_EXPIRES_IN
      ),
    });

    const resetLink =
      this._configService.get<string>(EConfigKeys.CLIENT_RESET_PASSWORD_URL) +
      `token=${resetToken}`;

    await this._mailerService.sendResetPasswordEmail(user.email, resetLink);
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    const payload = await this._jwtService.decode(data.token);

    const user = await this._userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this._hashPassword(data.password);

    user.password = hashedPassword;

    await this._userRepository.save(user);
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
}
