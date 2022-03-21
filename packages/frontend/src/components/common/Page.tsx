import Head from 'next/head';
import React from 'react';

import { Box } from '@chakra-ui/react';

export interface IPageProps {
  title?: string;
  children?: React.ReactNode;
}

const Page = ({ title, children }: IPageProps) => {
  return (
    <>
      <Head>
        <title>Moses{title && ` | ${title}`}</title>
      </Head>
      <Box p={4}>{children}</Box>
    </>
  );
};

export default Page;
