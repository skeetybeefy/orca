import { MultiValue, Select } from "chakra-react-select";
import { useFormik } from "formik";
import useUsersQuery from "hooks/queries/users/useUsersQuery";
import { ICreateGroupDto } from "monotypes/IGroup.interface";
import { FC, useCallback, useMemo } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { IUser } from "monotypes/IUser.interface";

interface IProps {
  onSubmit: (values: ICreateGroupDto) => void;
  initialValues: ICreateGroupDto;
  buttonText: string;
  users: IUser[];
}

const GroupUpsertForm: FC<IProps> = ({
  onSubmit,
  initialValues,
  buttonText,
  users,
}) => {
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
          <FormLabel htmlFor="name">Название</FormLabel>
          <Input
            value={values["name"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"name"}
            id="name"
            type="text"
            placeholder="Хирурги#1"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Описание</FormLabel>
          <Input
            value={values["description"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"description"}
            id="description"
            type="text"
            placeholder="Хирурги первого отделения"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="membersIds">Участники</FormLabel>
          <Select
            isMulti
            id="membersIds"
            name="membersIds"
            value={mappedSelectorValues}
            options={mappedUsersOptions}
            placeholder="Выбрать..."
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

const GroupsUpsertFormWrapper: FC<Omit<IProps, "users">> = (props) => {
  const { data: users, isLoading, isError, error } = useUsersQuery();

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>Error: ${error.message}</Text>;

  return <GroupUpsertForm {...props} users={users || []} />;
};

export default GroupsUpsertFormWrapper;
