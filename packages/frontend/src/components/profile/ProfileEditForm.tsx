import axios from 'axios';
import profileEditableFields from 'constants/profileEditableFields';
import profileMapping from 'constants/profileFieldsMapping';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Routes from 'types/enums/Routes';

import { Button, FormControl, FormLabel, Grid, GridItem, Input } from '@chakra-ui/react';
import { IUpdateUserDto } from '@orca/types';

const ProfileEditForm = ({ profile, id }) => {

  const router = useRouter()

  const onSubmit = async () => {
    console.log(values)
    const { data } = await axios.patch<IUpdateUserDto>(`/api/users/${id}`, values)
    router.push(Routes.Profile)
  }

  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: profile,
    onSubmit: onSubmit,
    enableReinitialize: true
  })

  return (
    <form onSubmit={handleSubmit} style={{"width": "100%"}}>
      <Grid templateColumns={"1fr 1fr"} gap="6" mt="2">
        {Object.keys(values).map((profileKey) => {
          return (
            <GridItem key={profileKey}>
              <FormControl>
                <FormLabel htmlFor={profileKey}>{profileMapping.get(profileKey)}</FormLabel>
                <Input
                  value={values[profileKey]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={profileKey}
                  id={profileKey}
                  type="text"
                  disabled={!profileEditableFields.get(profileKey)}
                  key={profileKey}
                />
              </FormControl>
            </GridItem>
          )
        })}
        <Button type="submit" w="full">
          Изменить профиль
        </Button>
      </Grid>
    </form>
  )
}

export default ProfileEditForm