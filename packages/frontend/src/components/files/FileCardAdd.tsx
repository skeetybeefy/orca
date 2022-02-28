import { AddIcon } from "@chakra-ui/icons"
import { Box, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC } from "react"
import Routes from "types/enums/Routes"

interface IFileCardAdd {
    isSelecting: boolean
}

const FileCardAdd: FC<IFileCardAdd> = ({isSelecting}) => {

    const router = useRouter()
    
    return (
        <Box w={60} p={7} borderWidth="1px" borderRadius="lg" overflow="hidden" _hover=
        { !isSelecting ? 
            {
                boxShadow: "xl",
                borderColor: "gray.400",
                cursor: "pointer" 
            } : {
                
            }
        } onClick={() => {
            if (!isSelecting) {
                router.push(`${Routes.FileCards}/create`)
            }
        }}>
            <Flex justifyContent={"center"} alignItems={"center"} h="full">
                <AddIcon boxSize="20%"/>
            </Flex>
        </Box>
    )
}

export default FileCardAdd