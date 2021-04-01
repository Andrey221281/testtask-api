import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosService } from '../axios/axios.service';
import { Pipeline } from './pipelines.entity';
import { Contact } from '../contacts/contacts.entity';

@Injectable()
export class PipelinesService {
  public pipelines: any[] = [];
  constructor(
    @InjectRepository(Pipeline)
    private pipelineRepository: Repository<Pipeline>,
    private axiosService: AxiosService,
  ) {}

  async onModuleInit() {
    await this.fetchAllPipelines();
  }

  updatePipelines() {
    this.pipelines.forEach((el) => {
      return this.pipelineRepository
        .createQueryBuilder()
        .update(Pipeline)
        .set({
          name: el.name,
          statuses: el._embedded.statuses,
        })
        .where('pipelineId = :pipelineId', { pipelineId: el.id })
        .execute();
    });
  }

  async fetchAllPipelines() {
    const pipelines = await this.axiosService.fetcher('leads/pipelines');
    this.pipelines = [...pipelines.data._embedded.pipelines];
  }
}
