import Page from "components/common/Page";
import GroupUpsertForm from "components/groups/GroupUpsertForm";
import useUpdateGroupByIdMutation from "api/mutations/groups/useUpdateGroupByIdMutation";
import useGroupByIdQuery from "api/queries/groups/useGroupByIdQuery";
import ProtectedLayout from "layouts/ProtectedLayout";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Routes from "types/enums/Routes";

import { Heading, VStack } from "@chakra-ui/react";
import { ICreateGroupDto } from "@orca/types";

const Update = () => {
  const router = useRouter();
  let { id } = router.query;

  const parsedId = useMemo(() => {
    if (!id) return -1;
    const idString = Array.isArray(id) ? id.join("") : id?.toString();
    return Number.parseInt(idString);
  }, [id]);

  const { data: group } = useGroupByIdQuery(parsedId);
  const updateGroupByIdMutation = useUpdateGroupByIdMutation(parsedId);

  const onUpdate = useCallback(
    (group) => {
      if (parsedId) {
        updateGroupByIdMutation.mutate(group);
        router.push(Routes.Groups);
      }
    },
    [updateGroupByIdMutation, router, parsedId]
  );

  const initialValues: ICreateGroupDto = useMemo(() => {
    return {
      name: group?.name || "",
      description: group?.description || "",
      membersIds: group?.membersIds || [],
    };
  }, [group]);

  return (
    <Page title="Редактирование группы">
      <VStack align="stretch" gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Редактирование группы
        </Heading>
        <GroupUpsertForm
          buttonText="Сохранить"
          onSubmit={onUpdate}
          initialValues={initialValues}
        />
      </VStack>
    </Page>
  );
};

Update.getLayout = ProtectedLayout;

export default Update;
