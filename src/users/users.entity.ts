import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Lead } from '../leads/leads.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  userId: number;

  @OneToOne(() => Lead, (lead) => lead.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  lead?: Lead;
}
