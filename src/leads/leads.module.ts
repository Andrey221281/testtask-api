import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './leads.entity';
import { AxiosModule } from '../axios/axios.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Lead]), AxiosModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
