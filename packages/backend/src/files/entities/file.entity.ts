import { Exclude } from "class-transformer";
import { Group } from "groups/entities/group.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { User } from "users/entities/user.entity";

import { FileCategory, IFile } from "@orca/types";

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
  ownerId: User["id"];

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: FileCategory })
  category: FileCategory;

  @ManyToMany(() => Group)
  @JoinTable()
  @Exclude()
  allowedGroups: Group[];

  @RelationId((self: File) => self.allowedGroups)
  allowedGroupsIds: Group["id"][];
}
