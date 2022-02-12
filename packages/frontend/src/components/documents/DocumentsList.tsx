import React, { useEffect } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import {
    Button, Flex, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDocuments } from 'store/selectors/documents';
import { getAllDocuments } from 'store/actions/documents';
import DocumentsTableRow from './DocumentsTableRow';
import Link from 'next/link';

const DocumentsList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllDocuments())
  }, [dispatch])

  const documents = useSelector(selectAllDocuments)

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Description</Th>
          <Th>Owner</Th>
          <Th textAlign="end">Manage</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td colSpan={4}>You can create a new document</Td>
          <Td>
            <Flex justify="end">
              <Link href="/documents/create">
                <Button size="sm">
                  <AddIcon />
                </Button>
              </Link>
            </Flex>
          </Td>
        </Tr>
        {documents.map((doc) => 
        <DocumentsTableRow {...doc} key={doc.id}/>)}
      </Tbody>
    </Table>
  );
};

export default DocumentsList;
