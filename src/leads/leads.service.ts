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
  // Вопрос про св-ва объекта и надо ли обозначать методы public private
  // Наверное тут не хватает типизации
  public leads: any = [];

  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private axiosService: AxiosService,
    private usersService: UserService,
    private contactsService: ContactsService,
    private pipelinesService: PipelinesService,
  ) {}

  async onModuleInit() {
    // при инициализации модуля
    await this.getLeads();
  }

  @Cron('*/5 * * * *')
  async getLeads() {
    this.logger.debug('Cron update');
    // получаем массив сделок из CRM и кладем в св-ва объекта
    const leads = await this.fetchAllLeads();
    this.leads = [...leads.data._embedded.leads];

    // кладем сделки в базу
    await this.createLeads();
  }

  async createLeads() {
    // получаем массив сделок из базы
    // мапим id сделок
    const leadsInBase = await this.leadRepository.find();
    const leadsIdsInBase = leadsInBase.map((e) => e.lead_id);

    // сохраняем в базу сделки
    this.leads.forEach((el) => {
      if (!leadsIdsInBase.includes(el.id)) {
        this.leadRepository.save({
          contacts: [...el._embedded.contacts],
          lead_id: el.id,
          pipeline: { pipelineId: el.pipeline_id },
          user: { userId: el.responsible_user_id },
          ...el,
        });
      }
    });
    // Когда уже все получено:
    // обновляем контакты
    this.contactsService.updateContacts();
    // обновляем пользователей
    this.usersService.updateUsers();
    // обновляем воронки
    this.pipelinesService.updatePipelines();
  }

  async fetchAllLeads() {
    // фетчим сделки
    return await this.axiosService.fetcher('leads?with=contacts');
  }

  // По id
  async findById(id) {
    return await this.leadRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.pipeline', 'pipeline')
      .leftJoinAndSelect('lead.user', 'user')
      .leftJoinAndSelect('lead.contacts', 'contacts')
      .where('lead.id = :id', { id })
      .getOne();
  }

  // Поиск :)
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
