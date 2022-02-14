import { IGroup } from "monotypes/IGroup.interface";
import Link from "next/link";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { deleteGroupById } from "store/actions/groups";
import { selectUserById, selectUsersByIds } from "store/selectors/users";

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

const GroupsTableRow: FC<IGroup> = ({
  id,
  name,
  membersIds,
  description,
  ownerId,
}) => {
  const dispatch = useDispatch();

  const onDelete = useCallback(() => {
    dispatch(deleteGroupById(id));
    onClose();
  }, [dispatch, id]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const owner = useSelector((state: RootState) =>
    selectUserById(state, ownerId)
  );
  const members = useSelector(selectUsersByIds(membersIds));

  console.log({ members });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this group?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This action is irreversible.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tr>
        <Td>{name}</Td>
        <Td>{description}</Td>
        <Td>
          <Menu>
            <MenuButton>
              <AvatarGroup size="sm" max={2}>
                {members.map(({ nickname, id }) => {
                  return <Avatar key={id} name={nickname} />;
                })}
              </AvatarGroup>
            </MenuButton>
            <MenuList>
              {members.map(({ nickname, id }) => {
                return <MenuItem key={id}>{nickname}</MenuItem>;
              })}
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
              <Link href={`/groups/update?id=${id}`}>
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
