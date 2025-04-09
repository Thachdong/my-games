import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { PAGE_SIZE } from '../constants';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginate } from '../../types/paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>
  ) {}

  /**
   * Generate verification token
   */
  private generateVerificationToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /**
   * Create user
   */
  async createUser(data: CreateUserDto): Promise<User> {
    const SALT_ROUND = 10;

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUND);

    const user = this._userRepository.create({
      ...data,
      password: hashedPassword,
      verificationToken: this.generateVerificationToken(),
    });

    await this._userRepository.save(user);

    return user;
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this._userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(`User with ID "${id}" does not exist!`, HttpStatus.BAD_REQUEST);
    }

    await this._userRepository.update(id, data);

    return this._userRepository.findOne({ where: { id } });
  }

  /**
   * Get user by id
   */
  async getUserById(id: string): Promise<User | void> {
    const user = await this._userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with id ${id} not found!`,
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }

  /**
   * Get all user
   */
  async getAll(page?: number, limit?: number): Promise<IPaginate<User>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * (limit || PAGE_SIZE);
    const [users, total] = await this._userRepository.findAndCount({
      take,
      skip,
    });

    return {
      page,
      limit,
      total,
      data: users
    };
  }
}
