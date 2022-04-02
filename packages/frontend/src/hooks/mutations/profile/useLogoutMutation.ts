import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';
import Routes from 'types/enums/Routes';

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(async () => {
    await axios.post("/api/auth/logout")
  }, {
    async onMutate() {
      queryClient.removeQueries(Entity.Profile);
      await queryClient.cancelQueries(Entity.Profile);
      router.push(Routes.Home);
    },
  });
};

export default useLogoutMutation;
