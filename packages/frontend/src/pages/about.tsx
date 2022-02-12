import Page from 'components/common/Page';
import UnderConstruction from 'components/common/UnderConstruction';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

const About = () => {
  return (
    <Page title="About">
      <UnderConstruction />
    </Page>
  );
};

About.getLayout = MainLayout;

export default About;
