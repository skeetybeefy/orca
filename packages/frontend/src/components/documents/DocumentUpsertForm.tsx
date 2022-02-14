import { MultiValue, Select as MultiSelect } from "chakra-react-select";
import { Field, FieldProps, Form, Formik, useFormik } from "formik";
import { FileCategory } from "monotypes/FileCategory.enum";
import { ICreateFileCardDto } from "monotypes/IFileCard.interface";
import { ChangeEventHandler, useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllGroups } from "store/selectors/groups";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

interface IProps {
  onSubmit: (values: ICreateFileCardDto) => void;
  initialValues: ICreateFileCardDto;
  buttonText: string;
}

const DocumentUpsertForm = ({
  onSubmit,
  initialValues,
  buttonText,
}: IProps) => {
  const { handleBlur, handleChange, handleSubmit, values, setFieldValue } =
    useFormik({ initialValues, onSubmit });

  const groups = useSelector(selectAllGroups);
  const mappedGroupsOptions = useMemo(
    () =>
      groups.map((group) => {
        return {
          value: group.id,
          label: group.name,
        };
      }),
    [groups]
  );
  const onSelectorValueChange = useCallback(
    (
      allowedGroups: MultiValue<{ value: number; label: string | undefined }>
    ) => {
      const allowedGroupsIds = allowedGroups.map(({ value }) => value);
      setFieldValue("allowedGroupsIds", allowedGroupsIds);
    },
    [setFieldValue]
  );

  const mappedSelectorValues = useMemo(() => {
    return values.allowedGroupsIds.map((value) => {
      const allowedGroup = groups.find((group) => group.id === value);
      return {
        label: allowedGroup?.name,
        value,
      };
    });
  }, [groups, values]);

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFieldValue("file", e.target.files![0]);
    },
    [setFieldValue]
  );

  useEffect(() => {
    console.log({ values });
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack p={2} gap={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="name"
            value={values["name"]}
            placeholder="filename"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="description"
            value={values["description"]}
            placeholder="File description"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="description">Category</FormLabel>
          <Select
            id="category"
            name="category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values["category"]}
          >
            <option value={FileCategory.Text}>Text</option>
            <option value={FileCategory.Video}>Video</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="allowedGroupsIds">Members</FormLabel>
          <MultiSelect
            isMulti
            id="allowedGroupsIds"
            name="allowedGroupsIds"
            value={mappedSelectorValues}
            options={mappedGroupsOptions}
            onChange={onSelectorValueChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">File</FormLabel>
          <Input
            onChange={onFileInputChange}
            type="file"
            id="description"
            placeholder="File"
          />
        </FormControl>
        <Button w="full" type="submit">
          {buttonText}
        </Button>
      </VStack>
    </form>
  );
};

export default DocumentUpsertForm;
