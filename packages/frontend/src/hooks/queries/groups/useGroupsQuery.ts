import GroupsService from "api/services/groups";
import { IGroup } from "monotypes/IGroup.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useGroupsQuery = () => {
  return useQuery<IGroup[], Error>(Entity.Groups, GroupsService.getAll);
};

export default useGroupsQuery;
