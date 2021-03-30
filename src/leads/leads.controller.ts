import { Controller, Get, Param, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Lead } from './leads.entity';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  getLeads(@Query('name') params: string) {
    return this.leadsService.search(params);
  }

  @Get(':id')
  getById(@Param() params): Promise<Lead> {
    return this.leadsService.findById(params.id);
  }
}
