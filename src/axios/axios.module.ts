import { HttpModule, HttpService, Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Axios } from './axios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Axios]), HttpModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
