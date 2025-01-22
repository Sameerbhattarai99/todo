import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [UserModule, PassportModule,JwtModule.registerAsync({
    imports: [ConfigModule],
useFactory: (configService: ConfigService) => ({
secret : configService.get("JWT_KEY"),
signOptions: {
expiresIn : configService.get<string>("JWT_EXPIRE") +"s"
}
  }),
  inject: [ConfigService],
})],
  controllers: [AuthController],
  providers: [LocalStrategy,JwtStrategy],
})
export class AuthModule {}
