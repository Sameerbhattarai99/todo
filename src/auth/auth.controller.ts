import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
@Controller('auth')
@ApiTags('Login')
export class AuthController {
    constructor(private jwtService:JwtService){}

@Post('/login')
@UseGuards(AuthGuard('local'))
login(@Req()req,@Body()LoginDto:LoginDto){
    ;
    const user: User = req.user;
    const payload={
        userId:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        role:user.role,
    }
    
return {token:this.jwtService.sign(payload)};
}
}

