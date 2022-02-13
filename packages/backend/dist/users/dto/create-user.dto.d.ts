import { Role } from 'src/users/entities/role.enum';
export declare class CreateUserDto {
    role: Role;
    email: string;
    password: string;
    nickname?: string;
    firstName: string;
    lastName?: string;
    middleName: string;
    addressRegion: string;
    addressSettlement: string;
    addressLocation: string;
    diplomaNumber: string;
    qualification: string;
    specification: string;
    medicalFacility: string;
}
