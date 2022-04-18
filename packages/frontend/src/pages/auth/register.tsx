import DoctorRegisterForm from "components/auth/register/DoctorRegisterForm";
import PatientRegisterForm from "components/auth/register/PatientRegisterForm";
import Page from "components/common/Page";
import useRegisterMutation from "api/mutations/profile/useRegisterMutation";
import MainLayout from "layouts/MainLayout";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Routes from "types/enums/Routes";

import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { ICreateUserDto } from "@orca/types";

const Register = () => {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const onRegister = useCallback(
    async (user: ICreateUserDto) => {
      await registerMutation.mutateAsync(user);
      router.push(Routes.Dashboard);
    },
    [registerMutation, router]
  );

  return (
    <Page title="Register">
      <VStack align="stretch" w="full" gap={4}>
        <Heading>Регистрация</Heading>
        <Tabs>
          <TabList>
            <Tab>Врач</Tab>
            <Tab>Пациент</Tab>
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
