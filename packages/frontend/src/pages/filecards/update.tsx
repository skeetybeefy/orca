import Page from 'components/common/Page';
import FileCardUpsertForm from 'components/files/FileCardUpsertForm';
import ProtectedLayout from 'layouts/ProtectedLayout';
import { FileCategory } from 'monotypes/FileCategory.enum';
import { ICreateFileCardDto } from 'monotypes/IFileCard.interface';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateFileCardById } from 'store/actions/filecards';
import { selectFileCardById } from 'store/selectors/filecards';
import Routes from 'types/enums/Routes';

import { Heading, VStack } from '@chakra-ui/react';

const Update = () => {
    const router = useRouter()
    let { id } = router.query
    const dispatch = useDispatch()

    const parsedId = useMemo(() => {
        if (!id) return -1;
        const idString = Array.isArray(id) ? id.join("") : id?.toString();
        return Number.parseInt(idString);
    }, [id]);

    const fileCard = useSelector((state: RootState) => selectFileCardById(state, parsedId)
    )

    const onUpdate = useCallback(
        (fileCard) => {
            if (parsedId) {
                dispatch(updateFileCardById({id: parsedId, fileCard}))
                router.push(Routes.FileCards)
            }
        },
        [dispatch, router, parsedId]
    )

    const initialValues: ICreateFileCardDto = useMemo(() => {
        return {
            name: fileCard?.name || "",
            description: fileCard?.description || "",
            category: fileCard?.category || FileCategory.Text,
            allowedGroupsIds: fileCard?.allowedGroupsIds || [],
            fileId: fileCard?.fileId || 1 // create a default fallback for this case?
        }
    }, [fileCard])

    return (
        <Page title="Updating a file card">
            <VStack align="stretch" gap={4}>
                <Heading size="md" w="full" textAlign="start">
                    Change the file card
                </Heading>
                <FileCardUpsertForm
                    onSubmit={onUpdate}
                    initialValues={initialValues}
                    buttonText={"Change"}
                />
            </VStack>
        </Page>
    )
}

Update.getLayout = ProtectedLayout;

export default Update;