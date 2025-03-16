import { 
  Controller, Get, Post, Body, Param, Query, Put, Delete, HttpCode, HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

@ApiTags('Todos') 
@Controller('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Todo created successfully', type: Todo })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated todos for a user' })
  @ApiQuery({ name: 'user', required: true, description: 'User ID to fetch todos' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated list of todos', type: [Todo] })
  async findAll(
    @Query('user') userId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ): Promise<{ todos: Todo[]; total: number }> {
    return await this.todosService.findAll(userId, parseInt(page, 10), parseInt(limit, 10));
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo found', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async findOne(@Param('id') id: string): Promise<Todo|null> {
    return await this.todosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Todo ID' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo updated successfully', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateTodoDto>): Promise<Todo|null> {
    return await this.todosService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Todo ID' })
  @ApiResponse({ status: 204, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.todosService.remove(id);
  }
}
