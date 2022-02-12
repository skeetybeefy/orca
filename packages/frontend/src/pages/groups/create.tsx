import Page from 'components/common/Page';
import GroupUpsertForm from 'components/groups/GroupUpsertForm';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createGroup } from 'store/actions/groups';
import { IGroup } from 'types/interfaces/group';

import { Heading, VStack } from '@chakra-ui/react';
import Routes from 'types/enums/Routes';
import ProtectedLayout from 'layouts/ProtectedLayout';

interface IMemberFormData {
    value: string,
    label: string,
}

const Create = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const onCreate = useCallback((group) => {
        group.membersIds = group.membersIds.map((memberFormData: IMemberFormData) => memberFormData.label)
        dispatch(createGroup(group))
        router.push(Routes.Groups)
    }, [dispatch, router])


    return (
        <Page title="Creating a group">
            <VStack gap={4}>
                <Heading size="md" w="full" textAlign="start">
                    Create a group
                </Heading>
                <GroupUpsertForm buttonText="Create" onSubmit={onCreate} initialValues={
                    {
                        name: "",
                        description: "",
                        membersIds: [],
                        owner: ""
                    } as Omit<IGroup, "id">
                } />
            </VStack>
        </Page>
    );
};

Create.getLayout = ProtectedLayout

export default Create;