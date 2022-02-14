import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userIsAuthenticatedSelector } from "store/selectors/profile";
import Routes from "types/enums/Routes";

const useRouteProtection = () => {
  const router = useRouter();
  const isAuthorized = useSelector(userIsAuthenticatedSelector);

  useEffect(() => {
    if (!isAuthorized) router.replace(Routes.Login);
  }, [router, isAuthorized]);
};

export default useRouteProtection;
