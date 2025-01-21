import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(":userId")
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto,@Param("userId") userId:number) {
    return this.todoService.create(createTodoDto,Number(userId));
  }

  @Get("/findAllNotCompleted/:userId")
  findAllTodosByUserIdNotCompleted(@Param("userId") userId:number) {
    return this.todoService.findAllTodosByUserNotCompleted(Number(userId));
  }
  @Get("/findAllCompleted/:userId")
  findAllTodosByUserIdCompleted(@Param("userId") userId:number) {
    return this.todoService.findAllTodosByUserCompleted(Number(userId));
  }


  @Patch(':id')
  update(@Param('id') id: string) {
    return this.todoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
