import MainLayout from 'layouts/MainLayout';
import { FileCategory } from 'monotypes/FileCategory.enum';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { deleteFileCardById, getAllFileCards } from 'store/actions/filecards';
import { selectFileCardById } from 'store/selectors/filecards';
import { allFilesSelector } from 'store/selectors/files';
import { selectAllGroups } from 'store/selectors/groups';
import { profileSelector } from 'store/selectors/profile';
import Routes from 'types/enums/Routes';

import {
    Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Text, useDisclosure, VStack
} from '@chakra-ui/react';

const View = () => {
    const router = useRouter()
    let { id } = router.query
    const dispatch = useDispatch()

    const parsedId = useMemo(() => {
        if (!id) return -1;
        const idString = Array.isArray(id) ? id.join("") : id?.toString();
        return Number.parseInt(idString);
    }, [id]);

    useEffect(() => {
        dispatch(getAllFileCards())
    }, [dispatch, router])

    const groups = useSelector(selectAllGroups) 
    const files = useSelector(allFilesSelector)

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onDelete = useCallback(() => {
        dispatch(deleteFileCardById(parsedId))
        onClose()
        router.push(Routes.FileCards)
    },
        [dispatch, parsedId])

    const fileCard = useSelector((state: RootState) => selectFileCardById(state, parsedId)
    )

    const user = useSelector((state: RootState) => profileSelector(state))

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete this filecard?</ModalHeader>
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
            <VStack mt={10} w="full">
                <Box w={60} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Box p="6">

                        <Box fontWeight={"bold"} fontSize="xl">
                            Name
                        </Box>
                        {fileCard?.name}

                        <Box fontWeight={"bold"} fontSize="xl" mt={4}>
                            Description
                        </Box>
                        {
                            fileCard?.description ?
                                fileCard?.description :
                                <Box color="gray.600" fontSize="sm">Empty description</Box>
                        }

                        <Box fontWeight={"bold"} fontSize="xl" mt={4}>
                            Category
                        </Box>
                        {
                            typeof fileCard?.category === "number" ?
                                FileCategory[fileCard?.category] :
                                <Box color="gray.600" fontSize="sm">Category is not specified</Box>
                        }

                        <Box fontWeight={"bold"} fontSize="xl" mt={4}>
                            Owner
                        </Box>
                        {
                            fileCard?.ownerId ?
                                `User ${fileCard.ownerId}` :
                                <Box color="gray.600" fontSize="sm">No owner</Box>
                        }

                        <Box
                            fontWeight="bold"
                            fontSize="xl"
                            mt={4}
                        >
                            Access groups
                        </Box>
                        {fileCard?.allowedGroupsIds.map((groupId) => {
                            const group = groups.find(group => group.id === groupId)
                            return (<Text>{group?.name}</Text>)
                        })}

                        <Box fontWeight={"bold"} fontSize="xl" mt={4}>
                            File
                        </Box>
                        {files.find(file => file.id === fileCard?.fileId)?.originalname || <Box color="gray.600" fontSize="sm">No file</Box>}
                        <Flex justifyContent={"space-around"}>
                            <Link href={`/filecards/update?id=${id}`}>
                                <Button display="block" mt={4} disabled={fileCard?.ownerId !== user?.id} >Change</Button>
                            </Link>
                            <Button onClick={onOpen} mt={4} disabled={fileCard?.ownerId !== user?.id} >Delete</Button>
                        </Flex>
                    </Box>
                </Box>
            </VStack>
        </>
    )
}

View.getLayout = MainLayout

export default View