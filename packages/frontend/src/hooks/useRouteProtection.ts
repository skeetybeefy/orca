import useProfileQuery from 'hooks/queries/useProfileQuery';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Routes from 'types/enums/Routes';

const useRouteProtection = () => {
  const { data, isSuccess } = useProfileQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isSuccess && Boolean(data)) router.replace(Routes.Login);
  }, [router, data, isSuccess]);
};

export default useRouteProtection;
