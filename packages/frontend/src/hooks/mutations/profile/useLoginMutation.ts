import AuthService from "api/services/auth";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";
import Routes from "types/enums/Routes";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(AuthService.logIn, {
    onSuccess(data) {
      queryClient.setQueryData(Entity.Profile, data);
      router.push(Routes.Dashboard);
    },
  });
};

export default useLoginMutation;
