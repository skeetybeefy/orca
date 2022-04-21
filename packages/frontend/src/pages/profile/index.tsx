import Page from 'components/common/Page';
import { useFormik } from 'formik';
import useProfileQuery from 'hooks/queries/useProfileQuery';
import ProtectedLayout from 'layouts/ProtectedLayout';

import {
  Avatar, Button, FormControl, FormLabel, Heading, HStack, Input, Spinner, Text, VStack
} from '@chakra-ui/react';

const Profile = () => {

  const { data: profile, isLoading, isError, error } = useProfileQuery()

  delete profile?.id

  const onUpdate = () => {

  }

  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: profile,
    onSubmit: onUpdate,
    enableReinitialize: true
  })

  console.log(values)


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
        <form onSubmit={handleSubmit}>
          <VStack p="2" gap="4">
            {Object.keys(values).map((profileKey) => {
              let disabled = true
              if (profileKey === "nickname") {
                disabled = false
              }

              return (
                <FormControl>
                  <FormLabel htmlFor={profileKey}>{profileKey}</FormLabel>
                  <Input
                    value={values[profileKey]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={profileKey}
                    id={profileKey}
                    type="text"
                    disabled={disabled}
                  />
                </FormControl>
              )
            })}
            <Button type="submit" w="full">
              Изменить профиль
            </Button>
          </VStack>
        </form>
      </VStack>
    </Page>
  )
}

Profile.getLayout = ProtectedLayout

export default Profile