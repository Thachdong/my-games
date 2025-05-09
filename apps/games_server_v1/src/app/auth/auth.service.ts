import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService) {}

  register() {
    // Registration logic here
  }

  login() {
    // Login logic here
  }

  logout() {
    // Logout logic here
  }

  activate() {
    // Account activation logic here
  }

  forgotPassword() {
    // Password recovery logic here
  }

  resetPassword() {
    // Password reset logic here
  }
}
