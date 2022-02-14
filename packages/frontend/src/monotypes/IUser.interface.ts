import { IGroup } from 'monotypes/IGroup.interface';
import { Role } from 'monotypes/Role.enum';

interface IBaseUser {
  id: number;
  role: Role;
  email: string;
  nickname?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  addressRegion: string;
  addressSettlement: string;
  addressLocation: string;
  password: string;
  groupsIds: IGroup['id'][];
  files: string[];
}

interface IMedicalInformation {
  diplomaNumber: string;
  qualification: string;
  specification: string;
  medicalFacility: string;
}

export type IUser = IBaseUser & IMedicalInformation;

export type ICreateUserDto = Omit<IBaseUser, 'id' | 'groupsIds' | 'files'> &
  Partial<IMedicalInformation>;

export type IUpdateUserDto = Pick<IUser, 'id'> & Partial<ICreateUserDto>;
