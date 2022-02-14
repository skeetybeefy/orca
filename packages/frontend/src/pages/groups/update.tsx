import Page from "components/common/Page";
import GroupUpsertForm from "components/groups/GroupUpsertForm";
import ProtectedLayout from "layouts/ProtectedLayout";
import { ICreateGroupDto } from "monotypes/IGroup.interface";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateGroupById } from "store/actions/groups";
import { selectGroupById } from "store/selectors/groups";
import Routes from "types/enums/Routes";

import { Heading, VStack } from "@chakra-ui/react";

const Update = () => {
  const router = useRouter();
  let { id } = router.query;
  const dispatch = useDispatch();

  const parsedId = useMemo(() => {
    if (!id) return -1;
    const idString = Array.isArray(id) ? id.join("") : id?.toString();
    return Number.parseInt(idString);
  }, [id]);

  const group = useSelector((state: RootState) =>
    selectGroupById(state, parsedId)
  );

  const onUpdate = useCallback(
    (group) => {
      if (parsedId) {
        dispatch(updateGroupById({ id: parsedId, group }));
        router.push(Routes.Groups);
      }
    },
    [dispatch, router, parsedId]
  );

  const initialValues: ICreateGroupDto = useMemo(() => {
    return {
      name: group?.name || "",
      description: group?.description || "",
      membersIds: group?.membersIds || [],
    };
  }, [group]);

  return (
    <Page title="Changing a group">
      <VStack align="stretch" gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Change a group
        </Heading>
        <GroupUpsertForm
          buttonText="Change"
          onSubmit={onUpdate}
          initialValues={initialValues}
        />
      </VStack>
    </Page>
  );
};

Update.getLayout = ProtectedLayout;

export default Update;
