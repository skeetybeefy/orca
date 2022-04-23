import useDeleteGroupByIdMutation from "api/mutations/groups/useDeleteGroupByIdMutation";
import useGroupByIdQuery from "api/queries/groups/useGroupByIdQuery";
import useUserByIdQuery from "api/queries/users/useUserByIdQuery";
import Link from "next/link";
import { FC, useCallback } from "react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { IGroup } from "@orca/types";

const GroupsTableRow: FC<IGroup> = ({ id }) => {
  const { data: group } = useGroupByIdQuery(id);

  const deleteGroupByIdMutation = useDeleteGroupByIdMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: owner } = useUserByIdQuery(group?.ownerId);

  // const members = useSelector(selectUsersByIds(membersIds));

  const onDelete = useCallback(() => {
    deleteGroupByIdMutation.mutate(id);
  }, [deleteGroupByIdMutation, id]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Удалить группу &quot;{group?.name}&quot;?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Данное действие нельзя отменить</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Удалить
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tr>
        <Td>{group?.name}</Td>
        <Td>{group?.description}</Td>
        <Td>
          <Menu>
            <MenuButton>
              {/* TODO fix members */}
              <AvatarGroup size="sm" max={2}>
                {/* {members.map(({ nickname, id }) => {
                  return <Avatar key={id} name={nickname} />;
                })} */}
              </AvatarGroup>
            </MenuButton>
            <MenuList>
              {/* {members.map(({ nickname, id }) => {
                return <MenuItem key={id}>{nickname}</MenuItem>;
              })} */}
            </MenuList>
          </Menu>
        </Td>
        <Td>
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={owner?.nickname} />
            </MenuButton>
            <MenuList>
              <MenuItem>{owner?.nickname}</MenuItem>
            </MenuList>
          </Menu>
        </Td>
        <Td>
          <Flex justify="end">
            <ButtonGroup>
              <Link passHref href={`/groups/update?id=${id}`}>
                <Button size="sm">
                  <EditIcon />
                </Button>
              </Link>
              <Button size="sm" onClick={onOpen}>
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          </Flex>
        </Td>
      </Tr>
    </>
  );
};

export default GroupsTableRow;
