import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log('createUserDto:', createUserDto);
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      console.log('error:', error)
      if (error.code === 11000) {
        throw new ConflictException('Username or email already exists.');
      }
      throw new InternalServerErrorException('Something went wrong while creating the user.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users.');
    }
  }
}
