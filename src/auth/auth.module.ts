import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import config from '../config/config';
import * as process from 'process';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('jwt')
      },
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, JsonWebTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
