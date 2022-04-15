import axios from "axios";
import FileUpload from "components/form/FileUpload";
import { useFormik } from "formik";
import React from "react";

import { IFile } from "@orca/types";

const Test = () => {
  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      avatar: undefined,
      nickname: "",
    },
    onSubmit: async ({ avatar, nickname }) => {
      const formData = new FormData();
      console.log({ avatar, nickname });
      formData.append("avatar", avatar);
      formData.append("nickname", nickname);
      const response = await axios.post<IFile>("/api/test", formData);
      console.log({ response });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <FileUpload onChange={setFieldValue} name="avatar" />
      <input
        onChange={handleChange}
        type="text"
        id="nickname"
        name="nickname"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Test;
