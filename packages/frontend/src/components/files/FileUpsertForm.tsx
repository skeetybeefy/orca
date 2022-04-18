import { Select } from "chakra-react-select";
import FileUpload from "components/form/FileUpload";
import useMultiselectState from "components/form/useMultiselectState";
import useSelectState from "components/form/useSelectState";
import Loadable from "components/Loadable";
import FileCategories from "constants/FileCategories";
import { useFormik } from "formik";
import useGroupsOptions from "api/queries/groups/useGroupsOptions";
import React, { FC } from "react";
import { SubmitFileDto } from "types/dtos/SubmitFileDto";
import IOption from "types/interfaces/Option";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

interface FileUpsertFormProps {
  allowedGroups: IOption[];
  initialValues: SubmitFileDto;
  submitText: string;
  onSubmit: (values: SubmitFileDto) => void;
}

const FileUpsertForm: FC<FileUpsertFormProps> = ({
  onSubmit,
  submitText,
  initialValues,
  allowedGroups,
}) => {
  const { handleSubmit, handleBlur, handleChange, setFieldValue, values } =
    useFormik({
      initialValues: { ...initialValues, file: null },
      onSubmit,
    });

  const [allowedGroupsValues, onAllowedGroupsChange] = useMultiselectState(
    allowedGroups,
    values.allowedGroupsIds,
    setFieldValue,
    "allowedGroupsIds"
  );

  const [fileCategoryValue, onFileCategoryChange] = useSelectState(
    FileCategories,
    values.category,
    setFieldValue,
    "category"
  );

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="stretch" gap={4}>
        <FileUpload name="file" onChange={setFieldValue} />

        <FormControl>
          <FormLabel htmlFor="filename">Название</FormLabel>
          <Input
            onChange={handleChange}
            type="text"
            id="filename"
            name="filename"
            value={values["filename"]}
            placeholder="Название"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="category">Категория</FormLabel>
          <Select
            options={FileCategories}
            id="category"
            name="category"
            value={fileCategoryValue}
            onChange={onFileCategoryChange}
            onBlur={handleBlur}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="allowedGroupsIds">Группы доступа</FormLabel>
          <Select
            isMulti
            id="allowedGroupsIds"
            name="allowedGroupsIds"
            options={allowedGroups}
            value={allowedGroupsValues}
            onChange={onAllowedGroupsChange}
            onBlur={handleBlur}
          />
        </FormControl>

        <Button w="full" type="submit">
          {submitText}
        </Button>
      </VStack>
    </form>
  );
};

const Wrapper: FC<Omit<FileUpsertFormProps, "groups">> = (props) => {
  const { data: groups, isLoading, isError, error } = useGroupsOptions();

  return (
    <Loadable {...{ isLoading, isError, error }}>
      <FileUpsertForm allowedGroups={groups} {...props} />
    </Loadable>
  );
};

export default Wrapper;
