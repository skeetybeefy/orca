import { Exclude } from 'class-transformer';
import { FileCategory } from 'src/files/entities/fileCategory.enum';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: FileCategory })
  category: FileCategory;

  @ManyToMany(() => Group)
  @JoinTable()
  allowedGroups: Group[];

  @ManyToOne(() => User, (user) => user.files)
  owner: User;

  @Column()
  url: string;
}
