import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lead } from '../leads/leads.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  contactId: number;

  @Column('json', { nullable: true })
  custom_fields_values?: unknown[];

  @ManyToOne(() => Lead, (lead: Lead) => lead.contacts, {
    onDelete: 'CASCADE',
  })
  // TODO add arr of contacts
  @JoinColumn({ name: 'contactsId' })
  lead?: Lead;
}
