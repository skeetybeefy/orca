import { FileCategory } from 'src/files/entities/fileCategory.enum';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
export declare class File {
    id: number;
    name: string;
    description: string;
    category: FileCategory;
    allowedGroups: Group[];
    owner: User;
    url: string;
}
