import useProfileQuery from "api/queries/useProfileQuery";
import Page from "components/common/Page";
import ProfileEditForm from "components/profile/ProfileEditForm";
import ProtectedLayout from "layouts/ProtectedLayout";

import {
  Avatar,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

const ProfilePageWrapper = ({ children }) => {
  return (
    <Page title="Profile">
      <VStack gap="4" align="start">
        <Heading size="lg" w="full" textAlign="start">
          Профиль
        </Heading>
        {children}
      </VStack>
    </Page>
  )
}

const Profile = () => {
  const { data: profile, isLoading, isError, error } = useProfileQuery();

  if (isLoading) {
    return (
      <ProfilePageWrapper>
        <Spinner />
      </ProfilePageWrapper>
    );
  }

  if (isError) {
    return (
      <ProfilePageWrapper>
        <Text>Ошибка: {error?.message}</Text>
      </ProfilePageWrapper>
    );
  }


  return (
    <ProfilePageWrapper>
      <HStack spacing={"4"}>
        <Avatar size="lg" name={profile?.nickname}></Avatar>
        <Text fontSize="lg">
          {profile?.firstName} {profile?.middleName} {profile?.lastName}
        </Text>
      </HStack>
      <Heading size="md" w="full" textAlign="start">
        Редактирование профиля
      </Heading>
      <ProfileEditForm profile={profile} />
    </ProfilePageWrapper>
  );
};

Profile.getLayout = ProtectedLayout;

export default Profile;
