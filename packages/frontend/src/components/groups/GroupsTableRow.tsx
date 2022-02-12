import Link from 'next/link';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGroupById } from 'store/actions/groups';
import { IGroup } from 'types/interfaces/group';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Avatar, AvatarGroup, Button, ButtonGroup, Flex, Menu, MenuButton, MenuItem, MenuList, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Text, Tr,
    useDisclosure
} from '@chakra-ui/react';

const GroupsTableRow: FC<IGroup> = ({ id, name, membersIds, description, owner }) => {

    const dispatch = useDispatch()

    const onDelete = useCallback(() => {
        dispatch(deleteGroupById(id))
        onClose()
    }, [dispatch, id])

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Delete this group?
                    </ModalHeader>
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
                                {membersIds.map(id => {
                                    return <Avatar key={id} name={id}></Avatar>
                                })}
                            </AvatarGroup>
                        </MenuButton>
                        <MenuList>
                            {membersIds.map(id => {
                                return <MenuItem key={id}>{id}</MenuItem>
                            })}
                        </MenuList>
                    </Menu>   
                </Td>
                <Td>
                    <Menu>
                        <MenuButton>
                            <Avatar
                                size="sm"
                                name={owner}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>{owner}</MenuItem>
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
    )
}

export default GroupsTableRow