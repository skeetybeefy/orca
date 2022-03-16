import Page from "components/common/Page";
import FileCardUpsertForm from "components/files/FileCardUpsertForm";
import useCreateFileCardMutation from "hooks/mutations/fileCards/useCreateFileCardMutation";
import ProtectedLayout from "layouts/ProtectedLayout";
import { FileCategory } from "monotypes/FileCategory.enum";
import { ICreateFileCardDto } from "monotypes/IFileCard.interface";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Routes from "types/enums/Routes";

import { Heading, VStack } from "@chakra-ui/react";

const Create = () => {
  const router = useRouter();

  const createFileCardMutation = useCreateFileCardMutation();
  const onCreate = useCallback(
    (fileCard: ICreateFileCardDto) => {
      createFileCardMutation.mutate(fileCard);
      router.push(Routes.FileCards);
    },
    [createFileCardMutation, router]
  );

  const initialValues: ICreateFileCardDto = useMemo(() => {
    return {
      name: "",
      description: "",
      category: FileCategory.Text,
      allowedGroupsIds: [],
      fileId: 1,
    };
  }, []);

  return (
    <Page title="Creating a file card">
      <VStack align="stretch" gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Создание карточки файла
        </Heading>
        <FileCardUpsertForm
          onSubmit={onCreate}
          initialValues={initialValues}
          buttonText={"Создать"}
        />
      </VStack>
    </Page>
  );
};

Create.getLayout = ProtectedLayout;

export default Create;
