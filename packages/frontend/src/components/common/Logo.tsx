import NextLink from "next/link";
import React from "react";
import Routes from "types/enums/Routes";

import { Heading, Link } from "@chakra-ui/react";

const Logo = () => {
  return (
    <NextLink href={Routes.Home} passHref>
      <Link as={Heading}>Океан Хирургия</Link>
    </NextLink>
  );
};

export default Logo;
