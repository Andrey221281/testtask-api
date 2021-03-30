import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosModule } from '../axios/axios.module';
import { UserService } from './user.service';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AxiosModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
