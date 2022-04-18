import UserAvatar from "components/common/UserAvatar";
import useLogoutMutation from "api/mutations/profile/useLogoutMutation";
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
        <MenuItem>Профиль</MenuItem>
        <MenuItem>Настройки</MenuItem>

        <MenuItem onClick={() => logoutMutation.mutate()}>Выйти</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
