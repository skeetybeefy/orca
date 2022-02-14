import { IFileCard } from "monotypes/IFileCard.interface";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "store/selectors/users";

import {
  Avatar,
  AvatarGroup,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const FileCard: FC<Partial<IFileCard>> = ({
  name,
  description,
  category,
  ownerId,
  allowedGroupsIds,
  fileId,
}) => {
  const members = useSelector(selectAllUsers);

  return (
    <Box w={60} borderWidth="1px" borderRadius="lg" overflow="hidden">
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
          {description}
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
        <Box>
          <Menu>
            <MenuButton>
              <AvatarGroup size="sm" max={2}>
                {members.map(({ nickname, id }) => {
                  return <Avatar key={id} name={nickname} />;
                })}
              </AvatarGroup>
            </MenuButton>
            <MenuList>
              {members.map(({ nickname, id }) => {
                return <MenuItem key={id}>{nickname}</MenuItem>;
              })}
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default FileCard;
