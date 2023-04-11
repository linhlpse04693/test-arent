import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../database/entities/user.entity';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';
import { LoginDto } from './dtos/login.dto';
import {use} from "passport";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //function hash password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  //function compare password param with user password in database
  comparePassword(
    password: string,
    storePasswordHash: string,
  ) {
    return bcrypt.compareSync(password, storePasswordHash);
  }

  async authentication(
    email: string,
    password: string,
  ): Promise<UserEntity | boolean> {
    const user = await this.userService.getUserByEmail(email);
    const check = this.comparePassword(password, user.password);

    if (!user || !check) {
      return false;
    }

    return user;
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    const isPasswordValid = this.comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return { token: this.jwtService.sign(payload), user: user };
  }
}
