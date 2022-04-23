import { IGroup } from "./IGroup.interface";
import { Role } from "./Role.enum";

export interface IBaseUser {
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
  groupsIds: IGroup["id"][];
  files: string[];
}

export interface IMedicalInformation {
  diplomaNumberLetterPart: string;
  diplomaNumberNumericPart: string;
  qualification: string;
  specification: string;
  medicalFacility: string;
}

export type IUser = IBaseUser & IMedicalInformation;

export type ICreateUserDto = Omit<IBaseUser, "id" | "groupsIds" | "files"> &
  Partial<IMedicalInformation>;

export type IUpdateUserDto = Pick<IUser, "id"> & Partial<ICreateUserDto>;
