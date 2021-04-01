import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lead } from '../leads/leads.entity';

@Entity()
export class Pipeline {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  pipelineId: number;

  @Column({ nullable: true })
  name?: string;

  @Column('json', { nullable: true })
  statuses?: unknown[];

  @OneToOne(() => Lead, (lead: Lead) => lead.pipeline, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  lead?: Lead;
}
