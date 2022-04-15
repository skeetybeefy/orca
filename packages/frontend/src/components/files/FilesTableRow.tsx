import useDeleteFileByIdMutation from "hooks/mutations/files/useDeleteFileByIdMutation";
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
import { ApiRoute, IFile } from "@orca/types";

const FilesTableRow: FC<IFile> = ({ id, originalname, mimetype, path }) => {
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
          <ModalHeader>Удалить файл?</ModalHeader>
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
        <Td>{originalname}</Td>
        <Td>
          <Link
            // href={`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoute.Files}/${id}`}
            href={`api/files/${id}`}
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
