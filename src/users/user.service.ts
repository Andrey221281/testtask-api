import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosService } from '../axios/axios.service';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private axiosService: AxiosService,
  ) {}

  async updateUsers() {
    const { data } = await this.axiosService.fetcher('users');

    data._embedded.users.forEach((el) => {
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
}
