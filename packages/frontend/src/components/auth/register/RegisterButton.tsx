import NextLink from "next/link";
import React from "react";
import Routes from "types/enums/Routes";

import { Button } from "@chakra-ui/react";

const RegisterButton = () => {
  return (
    <NextLink href={Routes.Register} passHref>
      <Button>Register</Button>
    </NextLink>
  );
};

export default RegisterButton;
