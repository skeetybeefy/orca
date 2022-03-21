import AuthService from "api/services/auth";
import { IUser } from "monotypes/IUser.interface";
import { useQuery, UseQueryOptions } from "react-query";
import Entity from "types/enums/Entity";

const useProfileQuery = (options?: Partial<UseQueryOptions<IUser, Error>>) => {
  return useQuery<IUser, Error>(
    Entity.Profile,
    AuthService.authenticate,
    options
  );
};

export default useProfileQuery;
