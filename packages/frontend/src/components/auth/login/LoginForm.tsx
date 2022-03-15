import { useFormik } from "formik";
import useLoginMutation from "hooks/mutations/profile/useLoginMutation";
import { ICredentials } from "monotypes/ICredentials.interface";
import React, { useCallback } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const onLogin = useCallback(
    (credentials: ICredentials) => {
      loginMutation.mutate(credentials);
    },
    [loginMutation]
  );

  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onLogin,
  });

  return (
    <form onSubmit={handleSubmit}>
      <VStack p={2} gap={4}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={values["email"]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="example@mail.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            value={values["password"]}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            type="password"
            placeholder="Password"
          />
        </FormControl>
        <Button type="submit" w="full">
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
