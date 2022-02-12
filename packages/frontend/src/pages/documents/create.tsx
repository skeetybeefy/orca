import Page from 'components/common/Page';
import DocumentUpsertForm from 'components/documents/DocumentUpsertForm';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createDocument } from 'store/actions/documents';
import Categories from 'types/enums/Categories';
import { IDocument } from 'types/interfaces/document';

import { Heading, VStack } from '@chakra-ui/react';
import Routes from 'types/enums/Routes';
import ProtectedLayout from 'layouts/ProtectedLayout';

const Create = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const onCreate = useCallback((values) => {
        dispatch(createDocument(values))
        router.push(Routes.Documents)
    }, [dispatch, router])


    return (
        <Page title="Creating a document">
            <VStack gap={4}>
                <Heading size="md" w="full" textAlign="start">
                    Create a document
                </Heading>
                <DocumentUpsertForm buttonText="Create" onSubmit={onCreate} initialValues={
                    {
                        name: "",
                        description: "",
                        category: Categories.Text,
                        ownerId: ""
                    } as Omit<IDocument, "id" | "accessGroups">
                } />
            </VStack>
        </Page>
    );
};

Create.getLayout = ProtectedLayout

export default Create;
