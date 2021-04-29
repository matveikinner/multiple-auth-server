import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';
import StrategyEnum from '../enums/strategy.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, StrategyEnum.LOCAL) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUserWithEmailAndPassword(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
