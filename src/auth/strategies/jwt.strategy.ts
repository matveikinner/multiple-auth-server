import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ConfigEnum from 'config/config.enum';
import { JwtModuleOptions } from '@nestjs/jwt';
import StrategyEnum from '../enums/strategy.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyEnum.JWT) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtModuleOptions>(ConfigEnum.AUTH)?.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
