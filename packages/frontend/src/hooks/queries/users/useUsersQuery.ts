import UsersService from "api/services/users";
import { IUser } from "monotypes/IUser.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useUsersQuery = () => {
  return useQuery<IUser[], Error>(Entity.Users, UsersService.getAll);
};

export default useUsersQuery;
