import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Lead {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column('int', { array: true })
  contactsId: number[];

  @Column()
  pipelineId: number;

  @Column()
  userId: number;

  @Column('json', { nullable: true })
  tags?: { id: number; name: string }[];

  @Column()
  created_at: number;
}
