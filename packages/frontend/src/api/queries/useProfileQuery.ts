import { useQuery, UseQueryOptions } from "react-query";
import Entity from "types/enums/Entity";

import { IUser } from "@orca/types";
import AuthService from "api/services/auth";

const useProfileQuery = (options?: Partial<UseQueryOptions<IUser, Error>>) => {
  return useQuery<IUser, Error>(
    Entity.Profile,
    async () => {
      try {
        const user = await AuthService.authenticate();
        return user;
      } catch {
        await AuthService.refresh();
      }
    },
    options
  );
};

export default useProfileQuery;
