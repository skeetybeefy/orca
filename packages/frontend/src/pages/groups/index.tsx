import Page from 'components/common/Page';
import GroupsList from 'components/groups/GroupsList';
import ProtectedLayout from 'layouts/ProtectedLayout';
import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

const Groups = () => {
  return (
    <Page title="Groups">
      <VStack gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Your groups
        </Heading>
        <GroupsList />
      </VStack>
    </Page>
  );
};

Groups.getLayout = ProtectedLayout;

export default Groups;
