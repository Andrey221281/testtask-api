import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './leads.entity';
import { AxiosModule } from '../axios/axios.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ContactsModule } from '../contacts/contacts.module';
import { PipelinesModule } from '../pipelines/pipelines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead]),
    AxiosModule,
    UsersModule,
    ContactsModule,
    PipelinesModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
