import Header from 'components/common/Header';
import React, { FC, ReactElement } from 'react';

import { Container, GridItem } from '@chakra-ui/react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const MainLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default MainLayout;
