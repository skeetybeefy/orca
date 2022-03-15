import Page from 'components/common/Page';
import FileCardUpsertForm from 'components/files/FileCardUpsertForm';
import ProtectedLayout from 'layouts/ProtectedLayout';
import { FileCategory } from 'monotypes/FileCategory.enum';
import { ICreateFileCardDto } from 'monotypes/IFileCard.interface';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createFileCard } from 'store/actions/filecards';
import Routes from 'types/enums/Routes';

import { Heading, VStack } from '@chakra-ui/react';

const Create = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const onCreate = useCallback(
        (fileCard: ICreateFileCardDto) => {
            dispatch(createFileCard(fileCard))
            router.push(Routes.FileCards)
        },
        [dispatch, router]
    )

    const initialValues: ICreateFileCardDto = useMemo(() => {
        return {
            name: "",
            description: "",
            category: FileCategory.Text,
            allowedGroupsIds: [],
            fileId: 1,
        }
    }, [])

    return (
        <Page title="Creating a file card">
            <VStack align="stretch" gap={4}>
                <Heading size="md" w="full" textAlign="start">
                    Create a file card
                </Heading>
                <FileCardUpsertForm
                    onSubmit={onCreate}
                    initialValues={initialValues}
                    buttonText={"Create"}
                />
            </VStack>
        </Page>
    )
}

Create.getLayout = ProtectedLayout

export default Create