import Page from 'components/common/Page';
import DocumentsList from 'components/documents/DocumentsList';
import ProtectedLayout from 'layouts/ProtectedLayout';
import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

const Documents = () => {
  return (
    <Page title="Documents">
      <VStack gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Your Documents
        </Heading>
        <DocumentsList />
      </VStack>  
    </Page>
  );
};

Documents.getLayout = ProtectedLayout;

export default Documents;
