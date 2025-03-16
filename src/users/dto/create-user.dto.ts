import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Unique email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'Profile image URL', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
