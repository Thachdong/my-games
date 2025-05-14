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

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService
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
    // Hash password
    const hashedPassword = await this._hashPassword(data.password);

    // Create user
    const user = this._userRepository.create({
      ...data,
      password: hashedPassword,
      verificationToken: this._generateVerificationToken(),
    });

    await this._userRepository.save(user);

    return user;
  }

  async validateUser(email: string, password: string): Promise<GetUserDto | null> {
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
    const payload = await this._jwtService.decode(token);

    const user = await this._userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.verificationToken !== token) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    user.isEmailVerified = true;
    user.verificationToken = null;

    await this._userRepository.save(user);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        `User with email (${email}) not found`,
        HttpStatus.NOT_FOUND
      );
    }

    // Generate reset password token
    const resetPasswordToken = this._generateJwtToken(user.id, user.email);

    // Send email with reset password link
    console.log(
      'TODO: Send email with reset password link',
      resetPasswordToken
    );
  }

  async resetPassword(resetPasswordToken: string): Promise<string> {
    const payload = await this._jwtService.decode(resetPasswordToken);

    const user = await this._userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const randomPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await this._hashPassword(randomPassword);

    user.password = hashedPassword;

    await this._userRepository.save(user);

    return randomPassword;
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
