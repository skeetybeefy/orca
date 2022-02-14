import React from "react";

import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { profileSelector } from "store/selectors/profile";

const UserAvatar = () => {
  const user = useSelector(profileSelector);
  return <Avatar size="sm" name={user?.nickname} />;
};

export default UserAvatar;
