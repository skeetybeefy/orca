import { IFile } from "monotypes/IFile.interface";
import {
  createFileAsync,
  deleteFileAsync,
  getAllFilesAsync,
} from "store/actions/files";
import Slices from "types/enums/Slices";

import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";

export const filesAdapter = createEntityAdapter<IFile>();

interface FilesSliceState {
  loading: boolean;
  files: EntityState<IFile>;
}

const initialState: FilesSliceState = {
  loading: false,
  files: filesAdapter.getInitialState(),
};

const requestStarted = (state: FilesSliceState) => {
  state.loading = true;
};

const filesGetAllRequestFulfilled = (
  state: FilesSliceState,
  { payload }: PayloadAction<IFile[]>
) => {
  state.loading = false;
  filesAdapter.upsertMany(state.files, payload);
};

const fileUpsertRequestFulfilled = (
  state: FilesSliceState,
  { payload }: PayloadAction<IFile | null>
) => {
  state.loading = false;
  if (payload !== null) {
    filesAdapter.upsertOne(state.files, payload);
  }
};

const fileDeleteRequestFulfilled = (
  state: FilesSliceState,
  { payload }: PayloadAction<number | null>
) => {
  state.loading = false;
  if (payload !== null) {
    filesAdapter.removeOne(state.files, payload);
  }
};

const filesSlice = createSlice({
  name: Slices.Files,
  initialState,
  reducers: {},
  extraReducers: {
    [createFileAsync.pending.type]: requestStarted,
    [createFileAsync.fulfilled.type]: fileUpsertRequestFulfilled,
    [createFileAsync.rejected.type]: fileUpsertRequestFulfilled,
    [getAllFilesAsync.pending.type]: requestStarted,
    [getAllFilesAsync.fulfilled.type]: filesGetAllRequestFulfilled,
    [getAllFilesAsync.rejected.type]: filesGetAllRequestFulfilled,
    [deleteFileAsync.pending.type]: requestStarted,
    [deleteFileAsync.fulfilled.type]: fileDeleteRequestFulfilled,
    [deleteFileAsync.rejected.type]: fileDeleteRequestFulfilled,
  },
});

export default filesSlice;
