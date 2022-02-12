export interface IUser {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: Date;
  settings?: Record<string, string>;
  address: string;
}

export interface IDoctor extends IUser {
  diplomaNumber: string;
  qualification: string;
  specialization: string;
  medicalFacility: string;
}

export interface IPatient extends IUser {}
