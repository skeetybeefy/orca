import DoctorRegisterForm from "components/auth/register/DoctorRegisterForm";
import PatientRegisterForm from "components/auth/register/PatientRegisterForm";
import Page from "components/common/Page";
import MainLayout from "layouts/MainLayout";
import { ICreateUserDto } from "monotypes/IUser.interface";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { registerAsync } from "store/actions/profile";
import Routes from "types/enums/Routes";

import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const onRegister = useCallback(
    async (user: ICreateUserDto) => {
      await dispatch(registerAsync(user)).unwrap();
      router.push(Routes.Dashboard);
    },
    [dispatch, router]
  );

  return (
    <Page title="Register">
      <VStack align="stretch" w="full" gap={4}>
        <Heading>Register</Heading>
        <Tabs>
          <TabList>
            <Tab>Doctor</Tab>
            <Tab>Patient</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DoctorRegisterForm onRegister={onRegister} />
            </TabPanel>
            <TabPanel>
              <PatientRegisterForm onRegister={onRegister} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Page>
  );
};

Register.getLayout = MainLayout;

export default Register;
