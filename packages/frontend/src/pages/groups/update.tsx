import Page from 'components/common/Page';
import GroupUpsertForm from 'components/groups/GroupUpsertForm';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateGroupById } from 'store/actions/groups';
import { IGroup } from 'types/interfaces/group';

import { Heading, VStack } from '@chakra-ui/react';
import { selectGroupById } from 'store/selectors/groups';
import Routes from 'types/enums/Routes';
import ProtectedLayout from 'layouts/ProtectedLayout';

const Update = () => {

    const router = useRouter()
    let {id} = router.query
    const dispatch = useDispatch()

    let idString = String(id) as string

    const group = useSelector((state: RootState) => selectGroupById(state, idString))

    const onUpdate = useCallback((group) => {
        dispatch(updateGroupById({id: idString, group}))
        router.push(Routes.Groups)
    }, [dispatch, router])

    return (
        <Page title="Changing a group">
            <VStack gap={4}>
                <Heading size="md" w="full" textAlign="start">
                    Change a group
                </Heading>
                <GroupUpsertForm buttonText="Change" onSubmit={onUpdate} initialValues={
                    {
                        name: group?.name,
                        description: group?.description,
                        membersIds: group?.membersIds,
                        owner: group?.owner
                    } as Omit<IGroup, "id">
                } />
            </VStack>
        </Page>
    );
};

Update.getLayout = ProtectedLayout

export default Update;