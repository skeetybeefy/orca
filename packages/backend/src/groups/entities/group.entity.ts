import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => User)
  @JoinColumn()
  public owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  public members: User[];

  @Column()
  public name: string;

  @Column()
  public description: string;
}
