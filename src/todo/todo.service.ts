import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repo/todo.repository';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

//add todo based on id
//find all todos based on user id(not completed)
//find all todos based on user id(completed)
//mark todo as completed based on todo id
//delete tdod based on todo id


@Injectable()
export class TodoService {

 

  constructor( @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>, private usesService:UserService){}

  async create(createTodoDto: CreateTodoDto,userId:number) {
    let todo:Todo=new Todo();
    todo.title=createTodoDto.title;
    todo.date=new Date().toLocaleString();
    todo.completed=false;
    todo.user=await this.usesService.findUserById(userId);

    return this.todoRepository.save(todo);
  }

  findAllTodosByUserNotCompleted(userId:number) {
    return this.todoRepository.find({
      relations :["user"],
      where :{user :{id : userId},completed:false}});
  }

  findAllTodosByUserCompleted(userId:number) {
    return this.todoRepository.find({
      relations :["user"],
      where :{user :{id : userId},completed:true}});
  }
  

  update(todoId: number) {
    return this.todoRepository.update(todoId,{completed:true});
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId) ;
  }
}
