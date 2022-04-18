import { useQuery } from "react-query";
import Entity from "types/enums/Entity";
import IOption from "types/interfaces/Option";

import { IGroup } from "@orca/types";
import GroupsService from "api/services/groups";

const useGroupsOptions = () => {
  return useQuery<IGroup[], Error, IOption[]>(
    Entity.Groups,
    GroupsService.getAll,
    {
      select: (items) =>
        items.map(({ name, id }) => ({
          label: name,
          value: id,
        })),
    }
  );
};

export default useGroupsOptions;
