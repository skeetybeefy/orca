import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { User } from "users/entities/user.entity";

import { IFile } from "@orca/types";

@Entity()
export class File implements IFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalname: string;

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
