import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { loginAsync } from 'store/actions/auth';
import Routes from 'types/enums/Routes';

import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const onLogin = useCallback(async () => {
    await dispatch(loginAsync({ password: "admin", login: "admin" })).unwrap();
    router.push(Routes.Dashboard);
  }, [dispatch, router]);
  return (
    <form>
      <VStack p={2} gap={4}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" placeholder="example@mail.com" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" placeholder="Password" />
        </FormControl>
        <Button onClick={onLogin} w="full">
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
