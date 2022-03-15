import NextLink from 'next/link';
import React from 'react';
import Routes from 'types/enums/Routes';

import { Button } from '@chakra-ui/react';

const LoginButton = () => {
  return (
    <NextLink href={Routes.Login} passHref>
      <Button>Login</Button>
    </NextLink>
  );
};

export default LoginButton;
