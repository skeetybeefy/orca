import { File } from 'src/files/entities/file.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Role } from 'src/users/entities/role.enum';
export declare class User {
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
    hashedRefreshToken: string;
    groups: Group[];
    files: File[];
}
