import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'john_doe', description: 'Unique username of the user' })
  @Prop()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Unique email of the user' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'Profile image URL of the user', required: false })
  @Prop()
  imageUrl?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
