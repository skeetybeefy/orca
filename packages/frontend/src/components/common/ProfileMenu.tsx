import UserAvatar from "components/common/UserAvatar";
import useLogoutMutation from "hooks/mutations/profile/useLogoutMutation";
import React from "react";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const ProfileMenu = () => {
  const logoutMutation = useLogoutMutation();

  return (
    <Menu>
      <MenuButton>
        <UserAvatar />
      </MenuButton>

      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>

        <MenuItem onClick={() => logoutMutation.mutate()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
