import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsModule } from './leads/leads.module';
import { AxiosModule } from './axios/axios.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { PipelinesModule } from './pipelines/pipelines.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: 'postgres://ovnksvcl:OZW-Nq09m4pcdyJEjGaCo_MziBCGR9eO@balarama.db.elephantsql.com:5432/ovnksvcl',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    LeadsModule,
    AxiosModule,
    UsersModule,
    ContactsModule,
    PipelinesModule,
  ],
})
export class AppModule {}
