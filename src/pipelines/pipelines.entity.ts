import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pipeline {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  pipelineId: string;

  @Column()
  leadId: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  color?: string;
}
