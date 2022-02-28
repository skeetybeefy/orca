import { IFileCard } from "monotypes/IFileCard.interface";
import React, { FC } from "react";

import {
  Avatar,
  AvatarGroup,
  Box,
  color,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const FileCard: FC<Partial<IFileCard> & {onClick: () => void, isSelecting: boolean, selected: boolean}> = ({
  name,
  description,
  category,
  ownerId,
  allowedGroupsIds,
  fileId,
  onClick,
  isSelecting,
  selected
}) => {

  return (
    <Box w={60} borderColor={selected ? "red.600" : ""} borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{
      boxShadow: "xl",
      borderColor: selected ? "red.600" : isSelecting ? "red.400" : "gray.400",
      cursor: "pointer" }}
      onClick={onClick}>
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm">
          {description || "No description"} 
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          Access groups
        </Box>
      </Box>
    </Box>
  );
};

export default FileCard;
