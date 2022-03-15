import Loader from "components/common/Loader/Loader";
import useFilesQuery from "hooks/queries/files/useFilesQuery";
import Link from "next/link";
import React from "react";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import FilesTableRow from "./FilesTableRow";

const FilesList = () => {
  const { data: files, isLoading, isError, error } = useFilesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

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
        {files?.map((file) => (
          <FilesTableRow {...file} key={file.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default FilesList;