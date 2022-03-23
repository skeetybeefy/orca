import UsersService from "api/services/users";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

import { IUser } from "@orca/types";

const useUsersQuery = () => {
  return useQuery<IUser[], Error>(Entity.Users, UsersService.getAll);
};

export default useUsersQuery;
