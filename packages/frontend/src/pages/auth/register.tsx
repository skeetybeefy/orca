import DoctorRegisterForm from 'components/auth/register/DoctorRegisterForm';
import PatientRegisterForm from 'components/auth/register/PatientRegisterForm';
import Page from 'components/common/Page';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';

const Register = () => {
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
              <DoctorRegisterForm />
            </TabPanel>
            <TabPanel>
              <PatientRegisterForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Page>
  );
};

Register.getLayout = MainLayout;

export default Register;
