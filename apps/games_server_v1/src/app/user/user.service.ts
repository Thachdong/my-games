import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { PAGE_SIZE } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginate } from '../../types/paginate';
import { IUserService } from 'app/user/interfaces';
import { GetUserDto } from 'app/user/dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>
  ) {}

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this._userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(`User with ID "${id}" does not exist!`, HttpStatus.BAD_REQUEST);
    }

    await this._userRepository.update(id, data);

    const updatedUser = await this._userRepository.findOne({ where: { id } });

    delete updatedUser['password'];

    return updatedUser;
  }

  async getUserById(id: string): Promise<User | void> {
    const user = await this._userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with id ${id} not found!`,
        HttpStatus.NOT_FOUND
      );
    }

    delete user['password']

    return user;
  }

  async getAll(page?: number, limit?: number): Promise<IPaginate<GetUserDto>> {
    const take = limit || PAGE_SIZE;
    const skip = ((page || 1) - 1) * (limit || PAGE_SIZE);
    const [users, total] = await this._userRepository.findAndCount({
      take,
      skip,
    });

    return {
      page: page || 1,
      limit: limit || PAGE_SIZE,
      total,
      data: users.map(({ password, ...u}) => ({ ...u}))
    };
  }
}
