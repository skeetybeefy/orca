import GroupsService from "api/services/groups";
import { IGroup } from "monotypes/IGroup.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useGroupByIdQuery = (id: IGroup["id"] | undefined) => {
  return useQuery<IGroup[], Error, IGroup | undefined>(
    Entity.Groups,
    GroupsService.getAll,
    {
      select: (groups) => groups.find((group) => group.id === id),
      enabled: !!id,
    }
  );
};

export default useGroupByIdQuery;
