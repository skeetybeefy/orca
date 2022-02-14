import FilesService from "api/services/files";
import { IFile } from "monotypes/IFile.interface";
import Slices from "types/enums/Slices";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const createFileAsync = createAsyncThunk(
  `${Slices.Files}/create`,
  async (file: File, { rejectWithValue }) => {
    try {
      const createdFile = await FilesService.create(file);
      return createdFile;
    } catch (e) {
      rejectWithValue(null);
    }
  }
);

export const getAllFilesAsync = createAsyncThunk(
  `${Slices.Files}/getAll`,
  async (_, { rejectWithValue }) => {
    try {
      const files = await FilesService.getAll();
      return files;
    } catch (e) {
      rejectWithValue([]);
    }
  }
);

export const deleteFileAsync = createAsyncThunk(
  `${Slices.Files}/delete`,
  async (fileId: IFile["id"], { rejectWithValue }) => {
    try {
      const deletedId = await FilesService.deleteById(fileId);
      return deletedId;
    } catch (e) {
      rejectWithValue(null);
    }
  }
);
