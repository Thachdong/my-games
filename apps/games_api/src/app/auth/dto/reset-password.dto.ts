import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({ example: 'newStrongPassword123', required: true })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', required: true, description: 'JWT token for password reset' })
    @IsString()
    @IsNotEmpty()
    token: string;
}