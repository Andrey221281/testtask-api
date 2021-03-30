import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './leads.entity';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private axiosServise: AxiosService,
  ) {}

  async onModuleInit() {
    await this.createLeads();
  }

  async getLeads() {
    // this.logger.debug('Service init');
    // try {
    //   return await this.axiosServise.fetcher('leads');
    // } catch (e) {
    //   console.log('erorr getLeads', e);
    // }
  }

  async createLeads() {
    const { data } = await this.axiosServise.fetcher('leads?with=contacts');

    data._embedded.leads.forEach((el) => {
      const contacts = el._embedded.contacts.map((el) => parseInt(el.id));

      const lead = new Lead();
      lead.id = el.id;
      lead.name = el.name;
      lead.price = el.price;
      lead.tags = el._embedded.tags;
      lead.pipelineId = el.status_id;
      lead.contactsId = [...contacts];
      lead.userId = el.responsible_user_id;
      lead.created_at = el.created_at;

      this.leadRepository.save(lead);
    });
  }
}
