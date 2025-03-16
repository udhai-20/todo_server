import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Todo {
  @ApiProperty({ example: 'Buy groceries', description: 'Title of the todo' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 'Get vegetables and fruits', description: 'Description of the todo', required: false })
  @Prop()
  description?: string;

  @ApiProperty({ example: 'medium', enum: ['low', 'medium', 'high'], description: 'Priority level of the todo' })
  @Prop({ enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: string;

  @ApiProperty({ example: false, description: 'Completion status of the todo' })
  @Prop({ default: false })
  completed: boolean;

  @ApiProperty({ example: '60f7a2c6f2a6f91a1b8d4c42', description: 'User ID (MongoDB ObjectId)' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @ApiProperty({ example: ['work', 'urgent'], description: 'Tags associated with the todo' })
  @Prop({ type: [String], default: [] })
  tags: string[];

  @ApiProperty({ example: ['60f7a2c6f2a6f91a1b8d4c43', '60f7a2c6f2a6f91a1b8d4c44'], description: 'IDs of assigned users' })
  @Prop({})
  assignedUsers: string[];

  @ApiProperty({
    example: [
      { content: 'First note', createdAt: '2024-03-15T12:00:00.000Z' },
      { content: 'Second note', createdAt: '2024-03-16T15:30:00.000Z' }
    ],
    description: 'List of notes with timestamps',
  })
  @Prop({
    type: [
      {
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  notes: { content: string; createdAt: Date }[];
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
