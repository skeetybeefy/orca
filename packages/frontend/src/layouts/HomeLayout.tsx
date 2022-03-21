import Header from "components/common/Header";
import React, { FC, ReactElement } from "react";

import { Container, GridItem } from "@chakra-ui/react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <GridItem>{children}</GridItem>
    </>
  );
};

const HomeLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomeLayout;
