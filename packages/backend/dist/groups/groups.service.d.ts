import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group.dto';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
export declare class GroupsService {
    private groupsRepository;
    constructor(groupsRepository: Repository<Group>);
    create(createGroupDto: CreateGroupDto): Promise<Group>;
    getAll(): Promise<Group[]>;
    getById(id: Group['id']): Promise<Group>;
    update(id: Group['id'], updateGroupDto: UpdateGroupDto): Promise<Group>;
    remove(id: Group['id']): Promise<void>;
}
