import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Contact } from '../contacts/contacts.entity';
import { Pipeline } from '../pipelines/pipelines.entity';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  lead_id: number;

  @Column()
  status_id: number;

  @Column({ nullable: true })
  created_at: number;

  @OneToOne(() => User, (user) => user.lead, { cascade: true })
  user: User;

  @ManyToMany(() => Contact, {
    cascade: true,
  })
  @JoinTable()
  contacts: Contact[];

  @OneToOne(() => Pipeline, (pipeline) => pipeline.lead, { cascade: true })
  pipeline: Pipeline;
}
