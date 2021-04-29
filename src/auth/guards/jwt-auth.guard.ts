import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import StrategyEnum from '../enums/strategy.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyEnum.JWT) {}
