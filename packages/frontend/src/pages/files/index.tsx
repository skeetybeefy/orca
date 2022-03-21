import Page from "components/common/Page";
import FilesList from "components/files/FilesList";
import ProtectedLayout from "layouts/ProtectedLayout";
import React from "react";

import { Heading, VStack } from "@chakra-ui/react";

const Files = () => {
  return (
    <Page title="Файлы">
      <VStack gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Ваши файлы
        </Heading>
        <FilesList />
      </VStack>
    </Page>
  );
};

Files.getLayout = ProtectedLayout;

export default Files;
