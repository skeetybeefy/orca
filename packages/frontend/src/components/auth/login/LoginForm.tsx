import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { loginAsync } from "store/actions/profile";
import Routes from "types/enums/Routes";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const onLogin = useCallback(
    async (credentials) => {
      await dispatch(loginAsync(credentials)).unwrap();
      router.push(Routes.Dashboard);
    },
    [dispatch, router]
  );

  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onLogin,
    enableReinitialize: true,
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
