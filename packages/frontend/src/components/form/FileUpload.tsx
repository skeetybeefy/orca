import React, { ChangeEvent, FC, useCallback } from "react";

import { Button, FormControl, FormLabel, Input, Link } from "@chakra-ui/react";

interface FileUploadProps {
  name: string;
  onChange: (field: string, value: any) => void;
  uploadText?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  name,
  onChange,
  uploadText = "Выбрать файл",
}) => {
  const onFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(name, event.target.files[0]);
    },
    [onChange, name]
  );
  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        <Button as={Link}>{uploadText}</Button>
      </FormLabel>
      <Input hidden type="file" id={name} name={name} onChange={onFileChange} />
    </FormControl>
  );
};

export default FileUpload;
