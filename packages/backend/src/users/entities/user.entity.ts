import { Exclude } from 'class-transformer';
import { File } from 'files/entities/file.entity';
import { Group } from 'groups/entities/group.entity';
import { IUser } from 'monotypes/IUser.interface';
import { Role } from 'users/entities/role.enum';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User implements Omit<IUser, 'groupsIds' | 'files'> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column()
  addressRegion: string;

  @Column()
  addressSettlement: string;

  @Column()
  addressLocation: string;

  @Column({ nullable: true })
  diplomaNumber: string;

  @Column({ nullable: true })
  qualification: string;

  @Column({ nullable: true })
  specification: string;

  @Column({ nullable: true })
  medicalFacility: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  hashedRefreshToken: string;

  @ManyToMany(() => Group, (group: Group) => group.members)
  groups: Group[];

  @OneToMany(() => File, (file) => file.owner)
  files: File[];
}
