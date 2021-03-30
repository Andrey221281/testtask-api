import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosModule } from '../axios/axios.module';
import { ContactsService } from './contacts.service';
import { Contact } from './contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), AxiosModule],
  providers: [ContactsService],
})
export class ContactsModule {}
