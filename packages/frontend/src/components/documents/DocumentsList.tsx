import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilesAsync } from "store/actions/files";
import { allFilesSelector } from "store/selectors/files";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import DocumentsTableRow from "./DocumentsTableRow";

const DocumentsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFilesAsync());
  }, [dispatch]);

  const documents = useSelector(allFilesSelector);

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Filename</Th>
          <Th>Url</Th>
          <Th>Mimetype</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td colSpan={3}>Upload your files</Td>
          <Td>
            <Flex justify="end">
              <Link passHref href="/files/create">
                <Button size="sm">
                  <AddIcon />
                </Button>
              </Link>
            </Flex>
          </Td>
        </Tr>
        {documents.map((doc) => (
          <DocumentsTableRow {...doc} key={doc.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default DocumentsList;
