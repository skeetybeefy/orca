import React, { FC } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ICreateUserDto } from "monotypes/IUser.interface";
import { useFormik } from "formik";
import { Role } from "monotypes/Role.enum";

export interface IRegisterFormProps {
  onRegister: (user: ICreateUserDto) => void;
}

const DoctorRegisterForm: FC<IRegisterFormProps> = ({ onRegister }) => {
  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
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
      diplomaNumber: "",
      qualification: "",
      specification: "",
      medicalFacility: "",
    },
    onSubmit: onRegister,
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
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            value={values["password"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"password"}
            id="password"
            type="password"
            placeholder="Password"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="nickname">Nickname</FormLabel>
          <Input
            value={values["nickname"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"nickname"}
            id="nickname"
            type="text"
            placeholder="Moses"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="firstName">Firstname</FormLabel>
          <Input
            value={values["firstName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"firstName"}
            id="firstName"
            type="text"
            placeholder="Ivan"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="lastName">Lastname</FormLabel>
          <Input
            value={values["lastName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"lastName"}
            id="lastName"
            type="text"
            placeholder="Ivanov"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="middleName">Middlename</FormLabel>
          <Input
            value={values["middleName"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"middleName"}
            id="middleName"
            type="text"
            placeholder="Ivanovich"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="addressRegion">Region</FormLabel>
          <Input
            value={values["addressRegion"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"addressRegion"}
            id="addressRegion"
            type="text"
            placeholder="Tatarstan"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="addressSettlement">Settlement</FormLabel>
          <Input
            value={values["addressSettlement"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"addressSettlement"}
            id="addressSettlement"
            type="text"
            placeholder="Kazan"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="addressLocation">Location</FormLabel>
          <Input
            value={values["addressLocation"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"addressLocation"}
            id="addressLocation"
            type="text"
            placeholder="Vishevskoho st."
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="diplomaNumber">Diploma Number</FormLabel>
          <Input
            value={values["diplomaNumber"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"diplomaNumber"}
            id="diplomaNumber"
            type="text"
            placeholder="9999999999"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="qualification">Qualification</FormLabel>
          <Input
            value={values["qualification"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"qualification"}
            id="qualification"
            type="text"
            placeholder="Professor"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="specification">Specification</FormLabel>
          <Input
            value={values["specification"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"specification"}
            id="specification"
            type="text"
            placeholder="Surgery"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="medicalFacility">Medical Facility</FormLabel>
          <Input
            value={values["medicalFacility"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"medicalFacility"}
            id="medicalFacility"
            type="text"
            placeholder="Saint Heart"
          />
        </FormControl>

        <Button type="submit" w="full">
          Register
        </Button>
      </VStack>
    </form>
  );
};

export default DoctorRegisterForm;
