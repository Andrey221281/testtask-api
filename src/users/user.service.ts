import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosService } from '../axios/axios.service';
import { User } from './users.entity';

@Injectable()
export class UserService {
  public users: any[] = [];
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private axiosService: AxiosService,
  ) {}

  async onModuleInit() {
    await this.fetchAllUsers();
  }

  updateUsers() {
    this.users.forEach((el) => {
      return this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          name: el.name,
        })
        .where('userId = :userId', { userId: el.id })
        .execute();
    });
  }

  async fetchAllUsers() {
    const users = await this.axiosService.fetcher('users');
    this.users = [...users.data._embedded.users];
  }
}
