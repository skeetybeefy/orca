import Link from 'next/link';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteByIdAsync } from 'store/actions/documents';
import { IDocument } from 'types/interfaces/document';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Avatar, Button, ButtonGroup, Flex, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Text, Tr,
    useDisclosure
} from '@chakra-ui/react';

const DocumentsTableRow: FC<IDocument> = ({ id, name, category, description, ownerId }) => {

    const dispatch = useDispatch()

    const onDelete = useCallback(() => {
        dispatch(deleteByIdAsync(id))
        onClose()
    }, [dispatch, id])

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Delete this document?
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
                <Td>{category}</Td>
                <Td>{description}</Td>
                <Td>
                    <Menu>
                        <MenuButton>
                            <Avatar
                                size="sm"
                                name={ownerId}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>{ownerId}</MenuItem>
                        </MenuList>
                    </Menu>
                </Td>
                <Td>
                    <Flex justify="end">
                        <ButtonGroup>
                            <Link href={`/documents/update?id=${id}`}>
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

export default DocumentsTableRow