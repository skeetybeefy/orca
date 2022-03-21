import Header from 'components/common/Header';
import Sider from 'components/common/Sider';
import useRouteProtection from 'hooks/useRouteProtection';
import React, { FC, ReactElement } from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

const Layout: FC = ({ children }) => {
  useRouteProtection();

  return (
    <>
      <Header />
      <Grid templateColumns={["1fr", null, "240px 3fr 1fr"]}>
        <GridItem p={4} display={["none", null, "block"]}>
          <Sider />
        </GridItem>
        <GridItem>{children}</GridItem>
      </Grid>
    </>
  );
};

const ProtectedLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default ProtectedLayout;
