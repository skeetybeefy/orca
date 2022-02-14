import Page from "components/common/Page";
import GroupUpsertForm from "components/groups/GroupUpsertForm";
import ProtectedLayout from "layouts/ProtectedLayout";
import { ICreateGroupDto } from "monotypes/IGroup.interface";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "store/actions/groups";
import Routes from "types/enums/Routes";

import { Heading, VStack } from "@chakra-ui/react";

const Create = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onCreate = useCallback(
    (group: ICreateGroupDto) => {
      dispatch(createGroup(group));
      router.push(Routes.Groups);
    },
    [dispatch, router]
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
          Create a group
        </Heading>
        <GroupUpsertForm
          buttonText="Create"
          onSubmit={onCreate}
          initialValues={initialValues}
        />
      </VStack>
    </Page>
  );
};

Create.getLayout = ProtectedLayout;

export default Create;
