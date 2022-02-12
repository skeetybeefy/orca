import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userIsAuthorizedSelector } from "store/selectors/auth";
import Routes from "types/enums/Routes";

const useRouteProtection = () => {
  const router = useRouter();
  const isAuthorized = useSelector(userIsAuthorizedSelector);

  useEffect(() => {
    if (!isAuthorized) router.replace(Routes.Login);
  }, [router, isAuthorized]);
};

export default useRouteProtection;
