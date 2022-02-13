import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group.dto';
import { GroupsService } from 'src/groups/groups.service';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(createGroupDto: CreateGroupDto): Promise<import("./entities/group.entity").Group>;
    findAll(): Promise<import("./entities/group.entity").Group[]>;
    findOne(id: string): Promise<import("./entities/group.entity").Group>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("./entities/group.entity").Group>;
    remove(id: string): Promise<void>;
}
