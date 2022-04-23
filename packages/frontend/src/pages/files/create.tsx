import Page from "components/common/Page";
import FileUpsertForm from "components/files/FileUpsertForm";
import useCreateFileMutation from "api/mutations/files/useCreateFileMutation";
import useGroupsOptions from "api/queries/groups/useGroupsOptions";
import ProtectedLayout from "layouts/ProtectedLayout";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { SubmitFileDto } from "types/dtos/SubmitFileDto";
import Routes from "types/enums/Routes";

import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { FileCategory } from "@orca/types";

const Create = () => {
  const router = useRouter();
  const createFileMutation = useCreateFileMutation();
  const onSubmit = useCallback(
    async (values: SubmitFileDto) => {
      await createFileMutation.mutateAsync(values);
      router.push(Routes.Files);
    },
    [router, createFileMutation]
  );

  const { data: groups, isLoading, isError, error } = useGroupsOptions();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Ошибка: {error?.message}</Text>;
  }

  return (
    <Page title="Creating a document">
      <VStack align={"stretch"} gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Загрузить файл
        </Heading>
        <FileUpsertForm
          initialValues={{
            filename: "",
            category: FileCategory.Text,
            description: "",
            allowedGroupsIds: [],
          }}
          allowedGroups={groups}
          onSubmit={onSubmit}
          submitText={"Загрузить"}
        />
      </VStack>
    </Page>
  );
};

Create.getLayout = ProtectedLayout;

export default Create;
