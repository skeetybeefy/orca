import useFilesQuery from "api/queries/files/useFilesQuery";
import Link from "next/link";
import React from "react";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Spinner,
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
    return <Spinner />;
  }

  if (isError) {
    return <Text>Ошибка: {error?.message}</Text>;
  }

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Название</Th>
          <Th>Url</Th>
          <Th>Тип</Th>
          <Th>Действия</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td colSpan={3}>Загрузить файл</Td>
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
