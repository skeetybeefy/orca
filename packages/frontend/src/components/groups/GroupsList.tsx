import React, { useEffect } from "react";

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
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "store/actions/groups";
import GroupsTableRow from "./GroupsTableRow";
import { selectAllGroups } from "store/selectors/groups";

// TODO user avatars
const GroupsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  const groups = useSelector(selectAllGroups);

  return (
    <>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Members</Th>
            <Th>Owner</Th>
            <Th textAlign="end">Manage</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>You can create a new group</Td>
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
          {groups.map((group) => (
            <GroupsTableRow {...group} key={group.id} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default GroupsList;
