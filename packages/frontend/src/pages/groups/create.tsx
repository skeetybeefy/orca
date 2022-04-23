import Page from "components/common/Page";
import GroupUpsertForm from "components/groups/GroupUpsertForm";
import useCreateGroupMutation from "api/mutations/groups/useCreateGroupMutation";
import ProtectedLayout from "layouts/ProtectedLayout";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Routes from "types/enums/Routes";

import { Heading, VStack } from "@chakra-ui/react";
import { ICreateGroupDto } from "@orca/types";

const Create = () => {
  const router = useRouter();

  const createGroupMutation = useCreateGroupMutation();

  const onCreate = useCallback(
    (group: ICreateGroupDto) => {
      createGroupMutation.mutate(group);
      router.push(Routes.Groups);
    },
    [router, createGroupMutation]
  );

  const initialValues: ICreateGroupDto = useMemo(() => {
    return {
      name: "",
      description: "",
      membersIds: [],
    };
  }, []);

  return (
    <Page title="Creating a group">
      <VStack align="stretch" gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Создание группы
        </Heading>
        <GroupUpsertForm
          buttonText="Создать"
          onSubmit={onCreate}
          initialValues={initialValues}
        />
      </VStack>
    </Page>
  );
};

Create.getLayout = ProtectedLayout;

export default Create;
