import Page from "components/common/Page";
import DocumentUpsertForm from "components/documents/DocumentUpsertForm";
import { useFormik } from "formik";
import ProtectedLayout from "layouts/ProtectedLayout";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { createFileAsync } from "store/actions/files";
import Routes from "types/enums/Routes";

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

interface FormWithFile {
  file: File | null;
}

const Create = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: async ({ file }: FormWithFile) => {
      if (file) {
        await dispatch(createFileAsync(file)).unwrap();
        router.push(Routes.Files);
      }
    },
  });

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFieldValue("file", e.target.files![0]);
    },
    [setFieldValue]
  );

  return (
    <Page title="Creating a document">
      <VStack align={"stretch"} gap={4}>
        <Heading size="md" w="full" textAlign="start">
          Create a file
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack align="stretch" gap={4}>
            <FormControl>
              <FormLabel htmlFor="file">File</FormLabel>
              <Input
                onChange={onFileInputChange}
                type="file"
                id="file"
                placeholder="File"
              />
            </FormControl>
            <Button w="full" type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </VStack>
    </Page>
  );
};

Create.getLayout = ProtectedLayout;

export default Create;
