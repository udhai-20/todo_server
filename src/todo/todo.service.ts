import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const createdTodo = new this.todoModel(createTodoDto);
      return await createdTodo.save();
    } catch (error) {
      console.log('error:', error);
      throw new InternalServerErrorException('Failed to create todo');
    }
  }

  async findAll(userId: string): Promise<Todo[]> {
    try {
      return await this.todoModel.find({ user: userId }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch todos');
    }
  }

  async findOne(id: string): Promise<Todo | null> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateData: Partial<CreateTodoDto>): Promise<Todo | null> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  }

  async remove(id: string): Promise<Todo | null> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return deletedTodo;
  }
}
