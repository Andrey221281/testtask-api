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
  id?: string;

  @Column()
  pipelineId: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  color?: string;

  @OneToOne(() => Lead, (lead: Lead) => lead.pipeline, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  lead?: Lead;
}
