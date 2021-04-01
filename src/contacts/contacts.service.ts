import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosService } from '../axios/axios.service';
import { Contact } from './contacts.entity';

@Injectable()
export class ContactsService {
  public contacts: any[] = [];
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private axiosService: AxiosService,
  ) {}

  async onModuleInit() {
    await this.fetchAllContacts();
  }

  updateContacts() {
    this.contacts.forEach((el) => {
      return this.contactRepository
        .createQueryBuilder()
        .update(Contact)
        .set({
          name: el.name,
          custom_fields_values: el.custom_fields_values,
        })
        .where('id = :id', { id: el.id })
        .execute();
    });
  }

  async fetchAllContacts() {
    const contacts = await this.axiosService.fetcher('contacts?with=leads');
    this.contacts = [...contacts.data._embedded.contacts];
  }
}
