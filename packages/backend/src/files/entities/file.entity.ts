import { Exclude } from 'class-transformer';
import { IFile } from 'monotypes/IFile.interface';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class File implements IFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => User, (user) => user.files)
  @Exclude()
  owner: User;

  @RelationId((self: File) => self.owner)
  ownerId: User['id'];
}
