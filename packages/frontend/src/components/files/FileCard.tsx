import React, { FC, useMemo } from "react";

import { Box } from "@chakra-ui/react";
import { IFileCard } from "@orca/types";

const FileCard: FC<
  Partial<IFileCard> & {
    onClick: () => void;
    isSelecting: boolean;
    selected: boolean;
    selectable: boolean;
  }
> = ({ name, description, onClick, isSelecting, selected, selectable }) => {
  const borderColor = useMemo(() => {
    if (selected) {
      return "red.600";
    } else {
      return "";
    }
  }, [selected]);

  // all cards have hover (gray.400 border) when NOT selecting
  // unselectable cards dont have a hover while selecting
  const hover = useMemo(() => {
    if (selectable) {
      if (selected) {
        return {
          boxShadow: "xl",
          borderColor: "red.600",
          cursor: "pointer",
        };
      } else {
        return {
          boxShadow: "xl",
          borderColor: isSelecting ? "red.400" : "gray.400",
          cursor: "pointer",
        };
      }
    } else if (isSelecting) {
      return {};
    } else {
      return {
        boxShadow: "xl",
        borderColor: "gray.400",
        cursor: "pointer",
      };
    }
  }, [selectable, selected, isSelecting]);

  return (
    <Box
      w={60}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={hover}
      onClick={onClick}
    >
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
          {description || "Без описания"}
        </Box>
      </Box>
    </Box>
  );
};

export default FileCard;
