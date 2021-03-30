import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './leads.entity';
import { AxiosService } from '../axios/axios.service';
import { UserService } from '../users/user.service';
import { ContactsService } from '../contacts/contacts.service';
import { PipelinesService } from '../pipelines/pipelines.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private axiosService: AxiosService,
    private usersService: UserService,
    private contactsService: ContactsService,
    private pipelinesService: PipelinesService,
  ) {}

  async onModuleInit() {
    await this.getLeads();
  }

  @Cron('*/5 * * * *')
  async getLeads() {
    this.logger.debug('Cron update');
    await this.createLeads();
    await this.usersService.updateUsers();
    await this.contactsService.updateContacts();
    await this.pipelinesService.updatePipelines();
  }

  async createLeads() {
    const { data } = await this.axiosService.fetcher('leads?with=contacts');

    data._embedded.leads.forEach((el) => {
      let idx;
      const contacts = el._embedded.contacts.map(
        (el) => (idx = parseInt(el.id)),
      );

      this.leadRepository
        .findOne({ where: { id: el.id } })
        .then((data: Lead) => {
          const lead = new Lead();
          lead.id = el.id;
          lead.name = el.name;
          lead.price = el.price;
          lead.tags = el._embedded.tags;
          lead.pipelineId = el.status_id;
          lead.contactsId = [...contacts];
          lead.pipeline = { pipelineId: el.status_id };
          lead.userId = el.responsible_user_id;
          lead.user = { userId: parseInt(el.responsible_user_id) };
          lead.contacts = [{ contactId: idx }];
          lead.created_at = el.created_at;
          if (data?.id !== el.id) {
            this.leadRepository.save(lead);
          }
        });
    });
  }

  async findById(id) {
    return await this.leadRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.pipeline', 'pipeline')
      .leftJoinAndSelect('lead.user', 'user')
      .leftJoinAndSelect('lead.contacts', 'contacts')
      .where('lead.id = :id', { id })
      .getOne();
  }

  async search(query) {
    if (query) {
      return await this.leadRepository
        .createQueryBuilder('lead')
        .leftJoinAndSelect('lead.pipeline', 'pipeline')
        .leftJoinAndSelect('lead.user', 'user')
        .leftJoinAndSelect('lead.contacts', 'contacts')
        .where(`to_tsvector(lead.name) @@ to_tsquery(:query)`, {
          query: `${query}:*`,
        })
        .getMany();
    }
    return await this.leadRepository.find({
      relations: ['contacts', 'user', 'pipeline'],
    });
  }
}
