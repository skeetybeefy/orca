import GroupsService from "api/services/groups";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

import { IGroup } from "@orca/types";

const useGroupByIdQuery = (id: IGroup["id"] | undefined) => {
  return useQuery<IGroup[], Error, IGroup | undefined>(
    Entity.Groups,
    GroupsService.getAll,
    {
      select: (items) => items.find((item) => item.id === id),
      enabled: !!id,
    }
  );
};

export default useGroupByIdQuery;
