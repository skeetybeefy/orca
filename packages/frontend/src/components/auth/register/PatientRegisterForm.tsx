import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const PatientRegisterForm = () => {
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
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
          <Input id="confirmPassword" type="password" placeholder="Password" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Firstname</FormLabel>
          <Input id="firstname" type="text" placeholder="Ivan" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastname">Lastname</FormLabel>
          <Input id="lastname" type="text" placeholder="Ivanov" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="middlename">Middlename</FormLabel>
          <Input id="middlename" type="text" placeholder="Ivanovich" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
          <Input id="birthdate" type="date" />
        </FormControl>
        <Button w="full">Register</Button>
      </VStack>
    </form>
  );
};

export default PatientRegisterForm;
