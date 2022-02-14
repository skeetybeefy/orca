import Page from "components/common/Page";
import ProtectedLayout from "layouts/ProtectedLayout";
import React from "react";

import { Flex, Heading, VStack } from "@chakra-ui/react";
import FileCard from "components/files/FileCard";

const FileCards = () => {
  return (
    <Page title="File cards">
      <VStack gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Your file cards
        </Heading>
        <Flex w="full" justify={"start"} gap={4}>
          <FileCard name="File card 1" description="File cards description" />
          <FileCard name="File card 1" description="File cards description" />
          <FileCard name="File card 1" description="File cards description" />
        </Flex>
      </VStack>
    </Page>
  );
};

FileCards.getLayout = ProtectedLayout;

export default FileCards;
