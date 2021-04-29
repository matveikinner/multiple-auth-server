import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import StrategyEnum from '../enums/strategy.enum';

@Injectable()
export class LocalAuthGuard extends AuthGuard(StrategyEnum.LOCAL) {}
