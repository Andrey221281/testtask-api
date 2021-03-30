import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosService } from '../axios/axios.service';
import { Contact } from './contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private axiosService: AxiosService,
  ) {}

  getContacts() {
    return this.contactRepository.find();
  }

  async updateContacts() {
    const { data } = await this.axiosService.fetcher('contacts?with=leads');

    data._embedded.contacts.forEach((el) => {
      return this.contactRepository
        .createQueryBuilder()
        .update(Contact)
        .set({
          first_name: el.first_name,
          last_name: el.last_name,
          custom_fields_values: el.custom_fields_values,
        })
        .where('contactId = :contactId', { contactId: el.id })
        .execute();
    });
  }
}
