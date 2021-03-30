import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosModule } from '../axios/axios.module';
import { PipelinesService } from './pipelines.service';
import { Pipeline } from './pipelines.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pipeline]), AxiosModule],
  providers: [PipelinesService],
})
export class PipelinesModule {}
