import AuthService from "api/services/auth";
import { IUser } from "monotypes/IUser.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useProfileQuery = () => {
  return useQuery<IUser, Error>(Entity.Profile, AuthService.authenticate);
};

export default useProfileQuery;
