import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsModule } from './leads/leads.module';
import { AxiosModule } from './axios/axios.module';
import * as ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { PipelinesModule } from './pipelines/pipelines.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    LeadsModule,
    AxiosModule,
    UsersModule,
    ContactsModule,
    PipelinesModule,
  ],
})
export class AppModule {}
