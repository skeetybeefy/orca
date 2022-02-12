import UserAvatar from "components/common/UserAvatar";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/actions/auth";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Menu>
      <MenuButton>
        <UserAvatar />
      </MenuButton>

      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>

        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
