import UserAvatar from "components/common/UserAvatar";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { logoutAsync } from "store/actions/profile";
import { useRouter } from "next/router";
import { AppDispatch } from "store";

const ProfileMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onLogout = useCallback(async () => {
    await dispatch(logoutAsync()).unwrap();
    window.location.assign("/");
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
