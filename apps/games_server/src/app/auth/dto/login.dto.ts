import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "username@gmail.com", required: true, type: "string" })
  email: string;

  @ApiProperty({ example: "", required: true, type: "string" })
  password: string;
}
