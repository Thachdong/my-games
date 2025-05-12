import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService
  ) {}

  /**
   * Generate verification token
   */
  private _generateVerificationToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /**
   * Hashing password
   * @param password
   * @returns Promise<string>
   */
  private async _hashPassword(password: string): Promise<string> {
    const SALT_ROUND = 10;

    return await bcrypt.hash(password, SALT_ROUND);
  }

  /**
   * Generate jwt token
   * @param userId
   * @param email
   * @returns Promise<string>
   */
  private async _generateJwtToken(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };

    return await this._jwtService.sign(payload);
  }

  /**
   * Register a new user
   */
  async register(data: RegisterDto): Promise<User> {
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

  async login(data: LoginDto): Promise<AuthenticatedUserDto | void> {
    // Get user by email
    const user = await this._userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException('Invalid credentials!', HttpStatus.UNAUTHORIZED);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials!', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const accessToken = await this._generateJwtToken(user.id, user.email);

    // Return user data and token
    return {
      ...user,
      accessToken,
    };
  }

  async logout(accessToken: string): Promise<void> {
    // Invalidate the token (implementation depends on your token management strategy)
    // For example, you could maintain a blacklist of invalidated tokens in a database or cache.
    // Here, we'll assume a token blacklist service or similar mechanism is in place.
    // Example:
    // await this._tokenBlacklistService.addToBlacklist(accessToken);

    // If no token blacklist is used, JWTs are stateless and cannot be invalidated server-side.
    // In that case, you can only rely on token expiration.

    console.log(`Token invalidated: ${accessToken}`);
  }

  async activate(userId: string, token: string): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { id: userId },
    })

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

  /**
   * Forgot password
   * @param email
   * @implements
   * - Check if user exists
   * - Generate reset password token
   * - Send email with reset password link
   * @returns void
   */
  async forgotPassword(email: string): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { email },
    })

    if (!user) {
      throw new HttpException(`User with email (${email}) not found`, HttpStatus.NOT_FOUND);
    }

    // Generate reset password token
    const resetPasswordToken = this._generateJwtToken(user.id, user.email);

    // Send email with reset password link
    console.log("TODO: Send email with reset password link", resetPasswordToken);
  }

  /**
   * Reset password
   * @param userId
   * @implements
   * - Check if user exists
   * - Generate random password
   * - Hash password
   * - Update user password
   * @returns random password
   */
  async resetPassword(resetPasswordToken: string): Promise<string> {
    const payload = await this._jwtService.decode(resetPasswordToken);

    const user = await this._userRepository.findOne({
      where: { id: payload.sub },
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const randomPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await this._hashPassword(randomPassword);

    user.password = hashedPassword;

    await this._userRepository.save(user);

    return randomPassword;
  }
}
