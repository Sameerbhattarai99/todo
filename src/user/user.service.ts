import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from '../utils/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor( @InjectRepository(User)
  private readonly userRepository: Repository<User>,){}



  async create(createUserDto: CreateUserDto) {
    let user:User =new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role=Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }
  async findUserById(id:number){
    return this.userRepository.findOneOrFail({where :{id:id}})
  }

  async findAll() {
    return this.userRepository.find();
  }
  findUserByEmail(email:string){
    return this.userRepository.findOneOrFail({where :{email:email}});
  }

 

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
