import { Exclude } from "class-transformer";
import {
    Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId
} from "typeorm";
import { User } from "users/entities/user.entity";

import { IGroup } from "@orca/types";

@Entity()
export class Group implements IGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Exclude()
  owner: User;

  @RelationId((self: Group) => self.owner)
  ownerId: User['id'];

  @ManyToMany(() => User)
  @JoinTable()
  @Exclude()
  members: User[];

  @RelationId((self: Group) => self.members)
  membersIds: User['id'][];

  @Column()
  name: string;

  @Column()
  description: string;
}
