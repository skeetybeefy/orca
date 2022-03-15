import AuthService from "api/services/auth";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";
import Routes from "types/enums/Routes";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(AuthService.logOut, {
    onMutate() {
      queryClient.invalidateQueries(Entity.Profile);
      router.push(Routes.Home);
    },
  });
};

export default useLogoutMutation;
