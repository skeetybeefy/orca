import { Exclude } from "class-transformer";
import { File } from "files/entities/file.entity";
import { Group } from "groups/entities/group.entity";
import {
    Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId
} from "typeorm";
import { User } from "users/entities/user.entity";

import { FileCategory, IFileCard } from "@orca/types";

@Entity()
export class FileCard
  implements Omit<IFileCard, 'allowedGroupsIds' | 'ownerId'>
{
  url: string;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: FileCategory })
  category: FileCategory;

  @ManyToMany(() => Group)
  @JoinTable()
  @Exclude()
  allowedGroups: Group[];

  @RelationId((self: FileCard) => self.allowedGroups)
  allowedGroupsIds: Group['id'][];

  @ManyToOne(() => User, (user) => user.files)
  @Exclude()
  owner: User;

  @RelationId((self: FileCard) => self.owner)
  ownerId: User['id'];

  @ManyToOne(() => File)
  @Exclude()
  file: File;

  @RelationId((self: FileCard) => self.file)
  fileId: File['id'];
}
