import UserAvatar from "components/common/UserAvatar";
import useLogoutMutation from "hooks/mutations/profile/useLogoutMutation";
import React from "react";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Routes from "types/enums/Routes";

const ProfileMenu = () => {
  const logoutMutation = useLogoutMutation();
  const router = useRouter()

  return (
    <Menu>
      <MenuButton>
        <UserAvatar />
      </MenuButton>

      <MenuList>
        <MenuItem onClick={() => {router.push(Routes.Profile)}}>Профиль</MenuItem>
        <MenuItem>Настройки</MenuItem>

        <MenuItem onClick={() => logoutMutation.mutate()}>Выйти</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
