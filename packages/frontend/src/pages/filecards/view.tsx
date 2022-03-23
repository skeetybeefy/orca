import useDeleteFileCardByIdMutation from "hooks/mutations/fileCards/useDeleteFileCardByIdMutation";
import useFileCardByIdQuery from "hooks/queries/fileCards/useFileCardByIdQuery";
import useFileByIdQuery from "hooks/queries/files/useFileByIdQuery";
import useFilesQuery from "hooks/queries/files/useFilesQuery";
import useGroupsQuery from "hooks/queries/groups/useGroupsQuery";
import useProfileQuery from "hooks/queries/useProfileQuery";
import ProtectedLayout from "layouts/ProtectedLayout";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Routes from "types/enums/Routes";

import {
    Box, Button, Flex, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Text, useDisclosure, VStack
} from "@chakra-ui/react";
import { ApiRoute, FileCategory } from "@orca/types";

const View = () => {
  const router = useRouter();
  let { id } = router.query;

  const parsedId = useMemo(() => {
    if (!id) return -1;
    const idString = Array.isArray(id) ? id.join("") : id?.toString();
    return Number.parseInt(idString);
  }, [id]);

  const { data: groups } = useGroupsQuery();
  const { data: files } = useFilesQuery();
  const { data: user } = useProfileQuery();
  const { data: fileCard } = useFileCardByIdQuery(parsedId);
  const { data: file } = useFileByIdQuery(fileCard?.fileId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteFileCardByIdMutation = useDeleteFileCardByIdMutation();

  const onDelete = useCallback(() => {
    deleteFileCardByIdMutation.mutate(parsedId);
    onClose();
    router.push(Routes.FileCards);
  }, [deleteFileCardByIdMutation, parsedId, onClose, router]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Удалить карточку файла?</ModalHeader>
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
      <VStack mt={10} w="full">
        <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box fontWeight={"bold"} fontSize="xl">
              Название
            </Box>
            {fileCard?.name}

            <Box fontWeight={"bold"} fontSize="xl" mt={4}>
              Описание
            </Box>
            {fileCard?.description ? (
              fileCard?.description
            ) : (
              <Box color="gray.600" fontSize="sm">
                -
              </Box>
            )}

            <Box fontWeight={"bold"} fontSize="xl" mt={4}>
              Категория
            </Box>
            {typeof fileCard?.category === "number" ? (
              FileCategory[fileCard?.category]
            ) : (
              <Box color="gray.600" fontSize="sm">
                -
              </Box>
            )}

            <Box fontWeight={"bold"} fontSize="xl" mt={4}>
              Владелец
            </Box>
            {fileCard?.ownerId ? (
              `User ${fileCard.ownerId}`
            ) : (
              <Box color="gray.600" fontSize="sm">
                -
              </Box>
            )}

            <Box fontWeight="bold" fontSize="xl" mt={4}>
              Группы доступа
            </Box>
            {fileCard?.allowedGroupsIds.map((groupId) => {
              const group = groups?.find((group) => group.id === groupId);
              return <Text key={group?.id}>{group?.name}</Text>;
            })}

            <Box fontWeight={"bold"} fontSize="xl" mt={4}>
              Файл
            </Box>
            {files?.find((file) => file.id === fileCard?.fileId)
              ?.originalname || (
              <Box color="gray.600" fontSize="sm">
                Нет файла
              </Box>
            )}
            <Flex align={"start"} gap={4}>
              <Button
                as={Link}
                href={`${process.env.NEXT_PUBLIC_API_URL}/${ApiRoute.Files}/${file?.id}`}
                display="block"
                lineHeight={10}
                mt={4}
                disabled={fileCard?.ownerId !== user?.id}
              >
                Скачать
              </Button>
              <NextLink passHref href={`${Routes.FileCards}/update?id=${id}`}>
                <Button
                  display="block"
                  mt={4}
                  disabled={fileCard?.ownerId !== user?.id}
                >
                  Редактировать
                </Button>
              </NextLink>
              <Button
                onClick={onOpen}
                mt={4}
                disabled={fileCard?.ownerId !== user?.id}
              >
                Удалить
              </Button>
            </Flex>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

View.getLayout = ProtectedLayout;

export default View;
