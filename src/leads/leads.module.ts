import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './leads.entity';
import { AxiosModule } from '../axios/axios.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ContactsModule } from '../contacts/contacts.module';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { Contact } from '../contacts/contacts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Contact]),
    AxiosModule,
    UsersModule,
    ContactsModule,
    PipelinesModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
