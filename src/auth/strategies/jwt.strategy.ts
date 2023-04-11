import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import { UserService } from '../../user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy, 'a') {
  constructor(private readonly userService: UserService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt').secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthPayload) {
    console.log(payload);
    const user = await this.userService.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
