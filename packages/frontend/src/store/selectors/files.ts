import { RootState } from "store";
import { filesAdapter } from "store/slices/files";

const filesStateSelector = (state: RootState) => state.files.files;

const files = filesAdapter.getSelectors(filesStateSelector);

export const allFilesSelector = files.selectAll;
