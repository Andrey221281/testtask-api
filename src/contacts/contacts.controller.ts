import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contact')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  getContacts() {
    return this.contactsService.getContacts();
  }
}
