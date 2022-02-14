import NextLink from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { userIsAuthenticatedSelector } from "store/selectors/profile";
import Routes from "types/enums/Routes";

import { Heading, Link } from "@chakra-ui/react";

const Logo = () => {
  const isAuthorized = useSelector(userIsAuthenticatedSelector);
  const href = useMemo(() => {
    return isAuthorized ? Routes.Dashboard : Routes.Home;
  }, [isAuthorized]);
  return (
    <NextLink href={href} passHref>
      <Link as={Heading}>Moses</Link>
    </NextLink>
  );
};

export default Logo;
