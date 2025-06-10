import { IPaginate } from 'types/paginate';
import { GetUserDto, UpdateUserDto } from 'app/user/dto';

export interface IUserService {
  /**
   * Description: Update user information
   * @param id type string
   * @param data type UpdateUserDto
   * @implements
   * - Get User
   * - Update User
   * @returns Promise<GetUserDto>
   * Exceptions:
   * - BAD_REQUEST
   */
  updateUser(id: string, data: UpdateUserDto): Promise<GetUserDto>;

  /**
   * Description: Get user by ID
   * @param id
   * @returns Promise<GetUserDto | void>
   * Exceptions:
   * - NOT_FOUND
   */
  getUserById(id: string): Promise<GetUserDto | void>;

  /**
   * Description: Get all users with pagination
   * @param page
   * @param limit
   * returns Promise<IPaginate<GetUserDto>>
   */
  getAll(page?: number, limit?: number): Promise<IPaginate<GetUserDto>>;
}
