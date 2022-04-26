import UsersService from 'api/services/users';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation(UsersService.updateById, {
    onSuccess(data) {
      queryClient.setQueryData(Entity.Profile, data)
    }
  })
}

export default useUpdateProfileMutation