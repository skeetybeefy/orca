import LoginForm from 'components/auth/login/LoginForm';
import Page from 'components/common/Page';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

const Login = () => {
  return (
    <Page title="Login">
      <VStack align="stretch" w="full" gap={4}>
        <Heading>Login</Heading>
        <LoginForm />
      </VStack>
    </Page>
  );
};

Login.getLayout = MainLayout;

export default Login;
