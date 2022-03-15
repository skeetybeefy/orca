import useDeleteFileByIdMutation from "hooks/mutations/files/useDeleteFileByIdMutation";
import { ApiRoute } from "monotypes/ApiRoute.enum";
import { IFile } from "monotypes/IFile.interface";
import Link from "next/link";
import { FC, useCallback } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
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

const FilesTableRow: FC<IFile> = ({ id, originalname, mimetype }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteFileByIdMutation = useDeleteFileByIdMutation(id);
  const onDelete = useCallback(() => {
    deleteFileByIdMutation.mutate();
    onClose();
  }, [deleteFileByIdMutation, onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this file?</ModalHeader>
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
        <Td>{originalname}</Td>
        <Td>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoute.Files}/${id}`}
          >
            Скачать
          </Link>
        </Td>
        <Td>{mimetype}</Td>
        <Td>
          <Flex justify="end">
            <ButtonGroup>
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

export default FilesTableRow;
