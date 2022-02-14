import { MultiValue, Select } from "chakra-react-select";
import { Field, FieldProps, Form, Formik, useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "store/actions/users";
import { selectAllUsers } from "store/selectors/users";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ICreateGroupDto } from "monotypes/IGroup.interface";

interface IProps {
  onSubmit: (values: ICreateGroupDto) => void;
  initialValues: ICreateGroupDto;
  buttonText: string;
}

const GroupUpsertForm = ({ onSubmit, initialValues, buttonText }: IProps) => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const mappedUsersOptions = useMemo(
    () =>
      users.map((user) => {
        return {
          value: user.id,
          label: user.nickname,
        };
      }),
    [users]
  );

  const { handleSubmit, handleBlur, handleChange, values, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit,
    });

  const onSelectorValueChange = useCallback(
    (members: MultiValue<{ value: number; label: string | undefined }>) => {
      const mappedMembers = members.map(({ value }) => value);
      setFieldValue("membersIds", mappedMembers);
    },
    [setFieldValue]
  );

  const mappedSelectorValues = useMemo(() => {
    return values.membersIds.map((value) => {
      const member = users.find((user) => user.id === value);
      return {
        label: member?.nickname,
        value,
      };
    });
  }, [users, values]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack p={2} gap={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            value={values["name"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"name"}
            id="name"
            type="text"
            placeholder="Group name"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            value={values["description"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"description"}
            id="description"
            type="text"
            placeholder="Group description"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="membersIds">Members</FormLabel>
          <Select
            isMulti
            id="membersIds"
            name="membersIds"
            value={mappedSelectorValues}
            options={mappedUsersOptions}
            onChange={onSelectorValueChange}
          />
        </FormControl>
        <Button w="full" type="submit">
          {buttonText}
        </Button>
      </VStack>
    </form>
  );
};

export default GroupUpsertForm;
