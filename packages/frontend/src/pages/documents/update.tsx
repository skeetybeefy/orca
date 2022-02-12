import Page from 'components/common/Page';
import DocumentUpsertForm from 'components/documents/DocumentUpsertForm';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateDocumentById } from 'store/actions/documents';
import { selectDocumentById } from 'store/selectors/documents';
import { IDocument } from 'types/interfaces/document';

import { Heading, VStack } from '@chakra-ui/react';
import Routes from 'types/enums/Routes';
import ProtectedLayout from 'layouts/ProtectedLayout';

const Update = () => {

    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()

    const document = useSelector((state: RootState) => selectDocumentById(state, Number(id)))

    const onUpdate = useCallback((document) => {
        dispatch(updateDocumentById({id: Number(id), document}))
        router.push(Routes.Documents)
    }, [dispatch, router])

    return (
        <Page title="Changing a document">
            <VStack gap={4}>
                <Heading size="md" w="full" textAlign="start">
                    Change a document
                </Heading>
                <DocumentUpsertForm buttonText="Change" onSubmit={onUpdate} initialValues={
                    {
                        name: document?.name,
                        description: document?.description,
                        category: document?.category,
                        ownerId: document?.ownerId
                    } as Omit<IDocument, "id" | "accessGroups">
                } />
            </VStack>
        </Page>
    );
};

Update.getLayout = ProtectedLayout

export default Update;
