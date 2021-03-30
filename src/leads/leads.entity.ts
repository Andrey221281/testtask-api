import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Contact } from '../contacts/contacts.entity';
import { Pipeline } from '../pipelines/pipelines.entity';

@Entity()
export class Lead {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column('int', { array: true, nullable: true })
  contactsId: number[];

  @Column()
  pipelineId: number;

  @Column({ nullable: true })
  userId: number;

  @Column('json', { nullable: true })
  tags?: { id: number; name: string }[];

  @Column()
  created_at: number;

  @OneToOne(() => User, (user) => user.lead, { cascade: true })
  user: User;

  @OneToMany(() => Contact, (contact) => contact.lead, { cascade: true })
  contacts: Contact[];

  @OneToOne(() => Pipeline, (pipeline) => pipeline.lead, { cascade: true })
  pipeline: Pipeline;
}
