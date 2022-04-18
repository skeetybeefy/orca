import GroupsService from "api/services/groups";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

import { IGroup } from "@orca/types";

const useGroupsQuery = () => {
  return useQuery<IGroup[], Error>(Entity.Groups, GroupsService.getAll);
};

export default useGroupsQuery;
