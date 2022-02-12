import { Exclude } from 'class-transformer';
import { File } from 'src/files/entities/file.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/users/entities/role.enum';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
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

  @Column()
  diplomaNumber: string;

  @Column()
  qualification: string;

  @Column()
  specification: string;

  @Column()
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
