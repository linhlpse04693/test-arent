import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthenticationGuard } from './guards/auth.guard';
import { UserEntity } from '../database/entities/user.entity';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() input: CreateUserDto): Promise<any> {
    const check = await this.validate(input.email);
    if (!check) {
      throw new BadRequestException('User existed');
    }
    input.password = await this.authService.hashPassword(input.password);

    return this.userService.create(input);
  }

  @Post('/login')
  async login(@Body() payload: LoginDto): Promise<any> {
    return await this.authService.login(payload);
  }

  @UseGuards(AuthenticationGuard)
  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('Not found!');
    }

    return user;
  }

  async validate(email: string): Promise<boolean> {
    const user = await this.userService.getUserByEmail(email);

    return !user;
  }
}
