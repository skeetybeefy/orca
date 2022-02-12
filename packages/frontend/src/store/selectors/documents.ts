import { RootState } from "store";
import { documentsAdapter } from "store/slices/documents";

const documents = documentsAdapter.getSelectors((state: RootState) => state.documents.documents)

export const selectAllDocuments = documents.selectAll

export const selectDocumentById = documents.selectById 