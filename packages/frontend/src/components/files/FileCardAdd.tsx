import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";
import Routes from "types/enums/Routes";

import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";

interface IFileCardAdd {
  isSelecting: boolean;
}

const FileCardAdd: FC<IFileCardAdd> = ({ isSelecting }) => {
  const router = useRouter();

  const hover = useMemo(() => {
    if (isSelecting) {
      return {};
    } else {
      return {
        boxShadow: "xl",
        borderColor: "gray.400",
        cursor: "pointer",
      };
    }
  }, [isSelecting]);

  const redirectToFileCardCreation = useCallback(() => {
    if (!isSelecting) {
      router.push(`${Routes.FileCards}/create`);
    }
  }, [router, isSelecting]);

  return (
    <Box
      w={60}
      h={130}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={hover}
      onClick={redirectToFileCardCreation}
    >
      <Flex justifyContent={"center"} alignItems={"center"} h="full">
        <AddIcon boxSize="20%" />
      </Flex>
    </Box>
  );
};

export default FileCardAdd;
