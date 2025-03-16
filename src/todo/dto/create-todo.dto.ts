import { 
    IsString, IsOptional, IsBoolean, IsEnum, IsArray, ValidateNested, IsMongoId 
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  class NoteDto {
    @ApiProperty({ example: 'This is a note', description: 'Content of the note' })
    @IsString()
    content: string;
  
    @ApiPropertyOptional({ example: '2024-03-15T12:00:00.000Z', description: 'Creation timestamp of the note' })
    @IsOptional()
    @Type(() => Date)
    createdAt?: Date;
  }
  
  export class CreateTodoDto {
    @ApiProperty({ example: 'Buy groceries', description: 'Title of the todo' })
    @IsString()
    title: string;
  
    @ApiPropertyOptional({ example: 'Get vegetables and fruits', description: 'Description of the todo' })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiProperty({ example: 'medium', enum: ['low', 'medium', 'high'], description: 'Priority of the todo' })
    @IsEnum(['low', 'medium', 'high'])
    priority: 'low' | 'medium' | 'high';
  
    @ApiPropertyOptional({ example: true, description: 'Completion status of the todo' })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  
    @ApiProperty({ example: '60f7a2c6f2a6f91a1b8d4c42', description: 'User ID (MongoDB ObjectId)' })
    @IsMongoId()
    user: string;
  
    @ApiPropertyOptional({ example: ['work', 'urgent'], description: 'Tags associated with the todo' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
  
    @ApiPropertyOptional({ example: ['60f7a2c6f2a6f91a1b8d4c43', '60f7a2c6f2a6f91a1b8d4c44'], description: 'IDs of assigned users' })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    assignedUsers?: string[];
  
    @ApiPropertyOptional({ type: [NoteDto], description: 'List of notes' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NoteDto)
    notes?: NoteDto[];
  }
  