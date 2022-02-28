import Page from 'components/common/Page';
import FileCard from 'components/files/FileCard';
import FileCardsList from 'components/files/FileCardsList';
import MainLayout from 'layouts/MainLayout';
import ProtectedLayout from 'layouts/ProtectedLayout';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFileCardById } from 'store/actions/filecards';

import { AddIcon, CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure, VStack
} from '@chakra-ui/react';

const FileCards = () => {

  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const [selectedCards, setSelectedCards] = useState<number[]>([])

  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    selectedCards.forEach(selectedCard => dispatch(deleteFileCardById(selectedCard)))
    setIsSelecting(!isSelecting)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete chosen file cards?</ModalHeader>
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
      <Page title="File cards">
        <Flex ml="auto" mr="auto">
          <Box>
            <Heading size="md" w="full" textAlign="center" mb={4}>
              Your file cards
            </Heading>
            <FileCardsList isSelecting={isSelecting} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
          </Box>
          <Spacer />
          <Box>
            <Heading size="md" w="full" textAlign="start" mb={4}>
              Manage file cards
            </Heading>
            <Button leftIcon={isSelecting ? <CloseIcon /> : <CheckIcon />} display="block" onClick={() => {
              if (isSelecting) {
                setSelectedCards([])
              }
              setIsSelecting(!isSelecting)
            }}>
              {isSelecting ? "Cancel" : "Select"}
            </Button>
            <Button leftIcon={<DeleteIcon />} display="block" mt={4} disabled={!isSelecting} onClick={onOpen}>
              Delete
            </Button>
          </Box>
        </Flex>
      </Page>
    </>
  );
};

FileCards.getLayout = MainLayout;

export default FileCards;
