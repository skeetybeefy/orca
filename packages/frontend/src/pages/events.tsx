import Page from 'components/common/Page';
import UnderConstruction from 'components/common/UnderConstruction';
import ProtectedLayout from 'layouts/ProtectedLayout';
import React, { ReactElement } from 'react';

const Events = () => {
  return (
    <Page title="Events">
      <UnderConstruction />
    </Page>
  );
};

Events.getLayout = ProtectedLayout;

export default Events;
