import { FileCategory } from 'src/files/entities/fileCategory.enum';
export declare class CreateFileDto {
    name: string;
    description?: string;
    category: FileCategory;
    allowedGroups: number[];
    ownerId: number;
}
