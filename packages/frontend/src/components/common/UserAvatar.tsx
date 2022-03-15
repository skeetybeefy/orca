import useProfileQuery from "hooks/queries/useProfileQuery";
import React from "react";

import { Avatar } from "@chakra-ui/react";

const UserAvatar = () => {
  const { data: profile } = useProfileQuery();
  return <Avatar size="sm" name={profile?.nickname} />;
};

export default UserAvatar;
