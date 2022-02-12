import Page from 'components/common/Page';
import UnderConstruction from 'components/common/UnderConstruction';
import ProtectedLayout from 'layouts/ProtectedLayout';
import React from 'react';

const Patients = () => {
  return (
    <Page title="Patients">
      <UnderConstruction />
    </Page>
  );
};

Patients.getLayout = ProtectedLayout;

export default Patients;
