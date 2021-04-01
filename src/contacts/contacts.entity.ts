import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lead } from '../leads/leads.entity';

@Entity()
export class Contact {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column('json', { nullable: true })
  custom_fields_values: unknown[];
}
