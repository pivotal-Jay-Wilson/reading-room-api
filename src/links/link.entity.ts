import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn,  Generated} from 'typeorm';

@Entity()
export class Link {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  authorId: string;

  @Column()
  categoryId: string;

  @Column({nullable: true})
  usedAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  mediaDt: Date;
}
