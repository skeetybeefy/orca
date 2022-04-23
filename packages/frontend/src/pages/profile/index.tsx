import Page from 'components/common/Page';
import ProfileEditForm from 'components/profile/ProfileEditForm';
import useProfileQuery from 'hooks/queries/useProfileQuery';
import ProtectedLayout from 'layouts/ProtectedLayout';

import { Avatar, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';

const Profile = () => {

  const { data: profile, isLoading, isError, error } = useProfileQuery()

  if (isLoading) {
    return (
      <Page title="Profile">
        <VStack gap="4" align="start">
          <Heading size="lg" w="full" textAlign="start">
            Профиль
          </Heading>
          <Spinner />
        </VStack>
      </Page>
    )
  }

  if (isError) {
    return (
      <Page title="Profile">
        <VStack gap="4" align="start">
          <Heading size="lg" w="full" textAlign="start">
            Профиль
          </Heading>
          <Text>Ошибка: {error?.message}</Text>
        </VStack>
      </Page>
    )
  }

  const id = profile.id

  delete profile?.id
  delete profile?.role
  
  return (
    <Page title="Profile">
      <VStack gap="4" align="start">
        <Heading size="lg" w="full" textAlign="start">
          Профиль
        </Heading>
        <HStack spacing={"4"}>
          <Avatar size="lg" name={profile?.nickname}></Avatar>
          <Text fontSize="lg">{profile?.firstName} {profile?.middleName} {profile?.lastName}</Text>
        </HStack>
        <Heading size="md" w="full" textAlign="start">
          Редактирование профиля
        </Heading>
        <ProfileEditForm profile={profile} id={id}/>
      </VStack>
    </Page>
  )
}

Profile.getLayout = ProtectedLayout

export default Profile