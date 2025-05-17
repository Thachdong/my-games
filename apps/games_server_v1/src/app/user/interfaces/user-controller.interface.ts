import { GetUserDto, UpdateUserDto } from 'app/user/dto';
import { HttpResponse } from 'common/http-response';

export interface AuthControllerInterface {
  /**
   * Description: Find all users with pagination
   * @param page number - optional - default 1
   * @param limit number - optional - default 25
   * @returns Promise<HttpResponse<GetUserDto[]>>
   */
  findAll(page?: number, limit?: number): Promise<HttpResponse<GetUserDto[]>>;

  /**
   * Description: Find user by id
   * @param id UUID - required
   * @returns Promise<HttpResponse<GetUserDto>>
   * @throws HttpException if user not found
   */
  findById(id: string): Promise<HttpResponse<GetUserDto>>;

  /**
   * Description: Update user by id
   * @param id UUID - required
   * @param data UpdateUserDto - required
   * @returns Promise<HttpResponse<GetUserDto>>
   * @throws HttpException if user not found
   */
  update(id: string, data: UpdateUserDto): Promise<HttpResponse<GetUserDto>>;
}
