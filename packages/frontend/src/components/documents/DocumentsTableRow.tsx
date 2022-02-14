import { ApiRoute } from "monotypes/ApiRoute.enum";
import { IFile } from "monotypes/IFile.interface";
import Link from "next/link";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteFileAsync } from "store/actions/files";

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

const DocumentsTableRow: FC<IFile> = ({ id, filename, path, mimetype }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onDelete = useCallback(() => {
    dispatch(deleteFileAsync(id));
    onClose();
  }, [dispatch, id, onClose]);

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
        <Td>{filename}</Td>
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

export default DocumentsTableRow;
