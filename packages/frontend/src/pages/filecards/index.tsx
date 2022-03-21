import Page from "components/common/Page";
import FileCardsList from "components/files/FileCardsList";
import useDeleteFileCardByIdMutation from "hooks/mutations/fileCards/useDeleteFileCardByIdMutation";
import ProtectedLayout from "layouts/ProtectedLayout";
import React, { useCallback, useState } from "react";

import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const FileCards = () => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteFileCardByIdMutation = useDeleteFileCardByIdMutation();

  const onDelete = useCallback(() => {
    selectedCards.forEach((selectedCard) =>
      deleteFileCardByIdMutation.mutate(selectedCard)
    );
    setIsSelecting(!isSelecting);
    onClose();
  }, [deleteFileCardByIdMutation, selectedCards, onClose, isSelecting]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Удалить выбранные карточки?</ModalHeader>
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
      <Page title="File cards">
        <Flex ml="auto" mr="auto">
          <Box>
            <Heading size="md" w="full" textAlign="start" mb={4}>
              Карточки файлов
            </Heading>
            <FileCardsList
              isSelecting={isSelecting}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
            />
          </Box>
          <Spacer />
          <Box>
            <Heading size="md" w="full" textAlign="start" mb={4}>
              Действия
            </Heading>
            <Button
              leftIcon={isSelecting ? <CloseIcon /> : <CheckIcon />}
              display="block"
              onClick={() => {
                if (isSelecting) {
                  setSelectedCards([]);
                }
                setIsSelecting(!isSelecting);
              }}
            >
              {isSelecting ? "Отмена" : "Выбрать"}
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              display="block"
              mt={4}
              disabled={!isSelecting}
              onClick={onOpen}
            >
              Удалить
            </Button>
          </Box>
        </Flex>
      </Page>
    </>
  );
};

FileCards.getLayout = ProtectedLayout;

export default FileCards;
