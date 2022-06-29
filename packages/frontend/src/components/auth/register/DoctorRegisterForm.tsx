import { useFormik } from 'formik';
import React, { FC } from 'react';
import { doctorValidationSchema } from 'validationSchemas/doctorValidationSchema';

import { Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { ICreateUserDto, Role } from '@orca/types';

export interface IRegisterFormProps {
  onRegister: (user: ICreateUserDto) => void;
}

const DoctorRegisterForm: FC<IRegisterFormProps> = ({ onRegister }) => {
  const { errors, handleChange, handleBlur, handleSubmit, touched, values } = useFormik({
    initialValues: {
      role: Role.Doctor,
      email: "",
      nickname: "",
      firstName: "",
      lastName: "",
      middleName: "",
      addressRegion: "",
      addressSettlement: "",
      addressLocation: "",
      password: "",
      diplomaNumberNumericPart: "",
      diplomaNumberLetterPart: "",
      qualification: "",
      specification: "",
      medicalFacility: "",
    },
    onSubmit: onRegister,
    validationSchema: doctorValidationSchema
  });
  return (
    <form onSubmit={handleSubmit}>
      <VStack p={2} gap={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            value={values["email"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"email"}
            id="email"
            type="email"
            placeholder="example@mail.com"
          />
          {(touched.email && errors.email) ?
           <Text mt={2} color="red.600">{errors.email}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Пароль</FormLabel>
          <Input
            value={values["password"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"password"}
            id="password"
            type="password"
            placeholder="Password"
          />
          {(touched.password && errors.password) ?
           <Text mt={2} color="red.600">{errors.password}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="nickname">Псевдоним</FormLabel>
          <Input
            value={values["nickname"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"nickname"}
            id="nickname"
            type="text"
            placeholder="nickname"
          />
          {(touched.nickname && errors.nickname) ?
           <Text mt={2} color="red.600">{errors.nickname}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="firstName">Имя</FormLabel>
          <Input
            value={values["firstName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"firstName"}
            id="firstName"
            type="text"
            placeholder="Иван"
          />
          {(touched.firstName && errors.firstName) ?
           <Text mt={2} color="red.600">{errors.firstName}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="lastName">Фамилия</FormLabel>
          <Input
            value={values["lastName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"lastName"}
            id="lastName"
            type="text"
            placeholder="Иванов"
          />
          {(touched.lastName && errors.lastName) ?
           <Text mt={2} color="red.600">{errors.lastName}</Text> :
            null}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="middleName">Отчество</FormLabel>
          <Input
            value={values["middleName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"middleName"}
            id="middleName"
            type="text"
            placeholder="Иванович"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="addressRegion">Регион</FormLabel>
          <Input
            value={values["addressRegion"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"addressRegion"}
            id="addressRegion"
            type="text"
            placeholder="Татарстан"
          />
          {(touched.addressRegion && errors.addressRegion) ?
           <Text mt={2} color="red.600">{errors.addressRegion}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="addressSettlement">Город / поселение</FormLabel>
          <Input
            value={values["addressSettlement"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"addressSettlement"}
            id="addressSettlement"
            type="text"
            placeholder="Казань"
          />
          {(touched.addressSettlement && errors.addressSettlement) ?
           <Text mt={2} color="red.600">{errors.addressSettlement}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="addressLocation">Адрес</FormLabel>
          <Input
            value={values["addressLocation"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"addressLocation"}
            id="addressLocation"
            type="text"
            placeholder="ул. Вишневского"
          />
          {(touched.addressLocation && errors.addressLocation) ?
           <Text mt={2} color="red.600">{errors.addressLocation}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="diplomaNumberLetterPart">
            Номер диплома (буквенная часть, 2 буквы)
          </FormLabel>
          <Input
            value={values["diplomaNumberLetterPart"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"diplomaNumberLetterPart"}
            id="diplomaNumberLetterPart"
            type="text"
            placeholder="AB"
          />
          {(touched.diplomaNumberLetterPart && errors.diplomaNumberLetterPart) ?
           <Text mt={2} color="red.600">{errors.diplomaNumberLetterPart}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="diplomaNumberNumericPart">
            Номер диплома (числовая часть, 6 цифр)
          </FormLabel>
          <Input
            value={values["diplomaNumberNumericPart"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"diplomaNumberNumericPart"}
            id="diplomaNumberNumericPart"
            type="text"
            placeholder="123456"
          />
          {(touched.diplomaNumberNumericPart && errors.diplomaNumberNumericPart) ?
           <Text mt={2} color="red.600">{errors.diplomaNumberNumericPart}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="qualification">Квалификация</FormLabel>
          <Input
            value={values["qualification"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"qualification"}
            id="qualification"
            type="text"
            placeholder="Профессор"
          />
          {(touched.qualification && errors.qualification) ?
           <Text mt={2} color="red.600">{errors.qualification}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="specification">Специализация</FormLabel>
          <Input
            value={values["specification"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"specification"}
            id="specification"
            type="text"
            placeholder="Хирургия"
          />
          {(touched.specification && errors.specification) ?
           <Text mt={2} color="red.600">{errors.specification}</Text> :
            null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="medicalFacility">
            Медицинское учреждение
          </FormLabel>
          <Input
            value={values["medicalFacility"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"medicalFacility"}
            id="medicalFacility"
            type="text"
            placeholder="Saint Heart"
          />
          {(touched.medicalFacility && errors.medicalFacility) ?
           <Text mt={2} color="red.600">{errors.medicalFacility}</Text> :
            null}
        </FormControl>

        <Button type="submit" w="full">
          Зарегистрироваться
        </Button>
      </VStack>
    </form>
  );
};

export default DoctorRegisterForm;
