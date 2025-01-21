import { Module } from '@nestjs/common';
import {ConfigModule,ConfigService} from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { User } from './user/entities/user.entity';
import { Todo } from './todo/entities/todo.entity';


//find all user
//add user
//delete user 


//add todo based on id
//find all todos based on user id(not completed)
//find all todos based on user id(completed)
//mark todo as completed based on todo id
//delete tdod based on todo id

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,envFilePath:['.local.env']}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    useFactory: (configService: ConfigService)=> ({
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      synchronize: configService.get<boolean>('DATABASE_SYNC'),
      logging: configService.get<boolean>('DATABASE_LOGGING'),
      entities:[User,Todo]
    }),
    }),
    UserModule,
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
