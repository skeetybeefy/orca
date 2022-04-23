import { useQuery, UseQueryOptions } from "react-query";
import Entity from "types/enums/Entity";

import { IUser } from "@orca/types";
import UsersService from "api/services/users";

const useUserByIdQuery = (
  id: IUser["id"] | undefined,
  options?: Partial<UseQueryOptions<IUser[], Error, IUser | undefined>>
) => {
  return useQuery<IUser[], Error, IUser | undefined>(
    Entity.Users,
    UsersService.getAll,
    {
      select: (users) => users.find((user) => user.id === id),
      enabled: !!id,
      ...options,
    }
  );
};

export default useUserByIdQuery;
