import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from 'src/auth/dtos/credentials.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(credentials: CredentialsDto) {
    return await this.usersRepository.create({ ...credentials }).save();
  }

  async findById(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
