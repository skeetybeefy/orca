import { MultiValue, Select, SingleValue } from "chakra-react-select";
import { useFormik } from "formik";
import useFilesQuery from "hooks/queries/files/useFilesQuery";
import useGroupsQuery from "hooks/queries/groups/useGroupsQuery";
import { useCallback, useMemo } from "react";

import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { FileCategory, ICreateFileCardDto } from "@orca/types";

interface IProps {
  onSubmit: (values: ICreateFileCardDto) => void;
  initialValues: ICreateFileCardDto;
  buttonText: string;
}

const FileCardUpsertForm = ({
  onSubmit,
  initialValues,
  buttonText,
}: IProps) => {
  const { handleSubmit, handleBlur, handleChange, values, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit,
    });

  const { data: groups } = useGroupsQuery();
  const { data: files } = useFilesQuery();

  const onCategoryChange = useCallback(
    (category: SingleValue<{ value: number; label: string }>) => {
      const transformedCategory = category?.value;
      setFieldValue("category", transformedCategory);
    },
    [setFieldValue]
  );

  const transformedCategory = useMemo(() => {
    return values.category === 0
      ? { label: "Text", value: 0 }
      : { label: "Video", value: 1 };
  }, [values]);

  const onAllowedGroupsIdsChange = useCallback(
    (
      allowedGroups: MultiValue<{ value: number; label: string | undefined }>
    ) => {
      const mappedGroups = allowedGroups.map(({ value }) => value);
      setFieldValue("allowedGroupsIds", mappedGroups);
    },
    [setFieldValue]
  );

  const mappedAllowedGroups = useMemo(() => {
    return values.allowedGroupsIds.map((value) => {
      const group = groups?.find((group) => group.id === value);
      return {
        label: group?.name,
        value,
      };
    });
  }, [values, groups]);

  const onFileIdChange = useCallback(
    (fileId: SingleValue<{ value: number; label: string | undefined }>) => {
      const transformedFileId = fileId?.value;
      setFieldValue("fileId", transformedFileId);
    },
    [setFieldValue]
  );

  const transformedFileId = useMemo(() => {
    const file = files?.find((file) => file.id === values.fileId);
    return {
      label: file?.originalname,
      value: values.fileId,
    };
  }, [values, files]);

  const mappedGroupsOptions = useMemo(() => {
    return groups?.map((group) => {
      return {
        label: group.name,
        value: group.id,
      };
    });
  }, [groups]);

  const mappedFileOptions = useMemo(() => {
    return files?.map((file) => {
      return {
        label: file.originalname,
        value: file.id,
      };
    });
  }, [files]);

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
            placeholder="File card name"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Описание</FormLabel>
          <Input
            value={values["description"]}
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            id="description"
            type="text"
            placeholder="File card description"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="category">Категория</FormLabel>
          <Select
            options={[
              {
                label: "Текст",
                value: FileCategory.Text,
              },
              {
                label: "Видео",
                value: FileCategory.Video,
              },
            ]}
            id="category"
            name="category"
            value={transformedCategory}
            onChange={onCategoryChange}
            onBlur={handleBlur}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="allowedGroupsIds">Группы доступа</FormLabel>
          <Select
            isMulti
            id="allowedGroupsIds"
            name="allowedGroupsIds"
            options={mappedGroupsOptions}
            value={mappedAllowedGroups}
            onChange={onAllowedGroupsIdsChange}
            onBlur={handleBlur}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="fileId">Файл</FormLabel>
          <Select
            options={mappedFileOptions}
            id="fileId"
            name="fileId"
            value={transformedFileId}
            onChange={onFileIdChange}
            onBlur={handleBlur}
          />
        </FormControl>
        <Button w="full" type="submit">
          {buttonText}
        </Button>
      </VStack>
    </form>
  );
};

export default FileCardUpsertForm;
