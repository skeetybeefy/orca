import { IGroup } from "types/interfaces/group"

class GroupsService {
    static _groups: IGroup[] = [
        {
            id: "group0",
            name: "Doctors",
            description: "Hospital #2048 employees",
            membersIds: ["Artem Pavlov", "Nikita Pavlov", "Elena Testova"],
            owner: "Artem Pavlov"
        }
    ]

    static _lastId: number = 1

    static async create(group: Omit<IGroup, "id">): Promise<IGroup> {
        const newGroup: IGroup = {
            ...group,
            id: `group${GroupsService._lastId++}`,
        }
        GroupsService._groups.push(newGroup)
        return newGroup
    }

    static async getAll():Promise<IGroup[]> {
        return GroupsService._groups
    }

    static async updateById(id: string, group: IGroup): Promise<IGroup> {
        const updatedGroup = {...group, id: id}
        GroupsService._groups = GroupsService._groups.filter(group => group.id !== id)
        GroupsService._groups.push(updatedGroup)
        return updatedGroup
    }

    static async deleteById(id: string): Promise<string> {
        GroupsService._groups = GroupsService._groups.filter(group => group.id !== id)
        return id
    }
}

export default GroupsService