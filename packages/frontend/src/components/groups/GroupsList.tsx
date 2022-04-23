import useGroupsQuery from "api/queries/groups/useGroupsQuery";
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

import GroupsTableRow from "./GroupsTableRow";

// TODO user avatars
const GroupsList = () => {
  const { data: groups, isLoading, isError, error } = useGroupsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Ошибка {error?.message}</Text>;
  }

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Название</Th>
          <Th>Описание</Th>
          <Th>Участники</Th>
          <Th>Владелец</Th>
          <Th textAlign="end">Действия</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td colSpan={4}>Создать новую группу</Td>
          <Td>
            <Flex justify="end">
              <Link passHref href="groups/create">
                <Button size="sm">
                  <AddIcon />
                </Button>
              </Link>
            </Flex>
          </Td>
        </Tr>
        {groups?.map((group) => (
          <GroupsTableRow {...group} key={group.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default GroupsList;
