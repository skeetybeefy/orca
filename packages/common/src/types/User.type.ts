import { Group } from "src/types/Group.type";
import { Role } from "src/types/Role.enum";

export type User = {
  id: number;
  role: Role;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  middleName: string;
  addressRegion: string;
  addressSettlement: string;
  addressLocation: string;
  diplomaNumber: string;
  qualification: string;
  specification: string;
  medicalFacility: string;
  password: string;
  groups: Group[];
  files: string[];
};

export type CreateDoctorUserDto = Omit<User, "id" | "groups" | "files">;

export type CreatePatientUserDto = Omit<
  CreateDoctorUserDto,
  "diplomaNumber" | "qualification" | "specification" | "medicalFacility"
>;

export type UpdateUserDto = Pick<User, "id"> & Partial<CreateDoctorUserDto>;
