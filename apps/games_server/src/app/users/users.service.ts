import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(
    email: string,
    password: string,
    fullName?: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      fullName,
      verificationToken: this.generateVerificationToken(),
    });
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.fullName) {
      user.fullName = updateUserDto.fullName;
    }

    if (updateUserDto.currentPassword && updateUserDto.newPassword) {
      const isPasswordValid = await bcrypt.compare(
        updateUserDto.currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      user.password = await bcrypt.hash(updateUserDto.newPassword, 10);
    }

    return this.usersRepository.save(user);
  }

  async verifyEmail(token: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    user.isEmailVerified = true;
    user.verificationToken = null;
    return this.usersRepository.save(user);
  }

  async updateScore(userId: string, newScore: number): Promise<User> {
    const user = await this.findOne(userId);
    user.score = newScore;
    return this.usersRepository.save(user);
  }

  async updateGameStats(
    userId: string,
    won: boolean,
    draw = false
  ): Promise<User> {
    const user = await this.findOne(userId);
    user.gamesPlayed += 1;

    if (draw) {
      user.gamesDraw += 1;
    } else if (won) {
      user.gamesWon += 1;
    } else {
      user.gamesLost += 1;
    }

    return this.usersRepository.save(user);
  }

  private generateVerificationToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
