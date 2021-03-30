import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AxiosService } from '../axios/axios.service';
import { Pipeline } from './pipelines.entity';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectRepository(Pipeline)
    private pipelineRepository: Repository<Pipeline>,
    private axiosService: AxiosService,
  ) {}

  async updatePipelines() {
    const res = await this.axiosService.fetcher('leads/pipelines');

    res?.data._embedded.pipelines.map((el) => {
      el._embedded?.statuses.forEach((statuses) => {
        return this.pipelineRepository
          .createQueryBuilder()
          .update(Pipeline)
          .set({
            name: statuses.name,
            color: statuses.color,
          })
          .where('pipelineId = :pipelineId', { pipelineId: statuses.id })
          .execute();
      });
    });
  }
}
