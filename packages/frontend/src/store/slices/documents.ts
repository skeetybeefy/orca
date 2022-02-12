import { createDocument, deleteDocumentById, getAllDocuments, updateDocumentById } from 'store/actions/documents';
import Slices from 'types/enums/Slices';
import { IDocument } from 'types/interfaces/document';

import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

export const documentsAdapter = createEntityAdapter<IDocument>();

interface DocumentsSliceState {
  loading: boolean;
  documents: EntityState<IDocument>
}

const documentsRequestStarted = (
  state: DocumentsSliceState
) => {
  state.loading = true
}

const documentUpsertRequestFulfilled = (
  state: DocumentsSliceState,
  {payload}: PayloadAction<IDocument | null>
) => {
  state.loading = false
  if (payload !== null) {
  documentsAdapter.upsertOne(state.documents, payload)
  }
}

const documentGetAllRequestFulfilled = (
  state: DocumentsSliceState,
  {payload}: PayloadAction<IDocument[]>
) => {
  state.loading = false
  documentsAdapter.upsertMany(state.documents, payload)
}

const documentDeleteRequestFulfilled = (
  state: DocumentsSliceState,
  {payload}: PayloadAction<number | null>
) => {
  state.loading = false
  if (payload !== null) {
    documentsAdapter.removeOne(state.documents, payload)
  }
}


const documentsSlice = createSlice({
  name: Slices.Documents,
  initialState: {loading: false, documents: documentsAdapter.getInitialState()},
  reducers: {},
  extraReducers: {
    [createDocument.pending.type]: documentsRequestStarted,
    [createDocument.fulfilled.type]: documentUpsertRequestFulfilled,
    [createDocument.rejected.type]: documentUpsertRequestFulfilled,
    [getAllDocuments.pending.type]: documentsRequestStarted,
    [getAllDocuments.fulfilled.type]: documentGetAllRequestFulfilled,
    [getAllDocuments.rejected.type]: documentGetAllRequestFulfilled,
    [updateDocumentById.pending.type]: documentsRequestStarted,
    [updateDocumentById.fulfilled.type]: documentUpsertRequestFulfilled,
    [updateDocumentById.rejected.type]: documentUpsertRequestFulfilled,
    [deleteDocumentById.pending.type]: documentsRequestStarted,
    [deleteDocumentById.fulfilled.type]: documentDeleteRequestFulfilled,
    [deleteDocumentById.rejected.type]: documentDeleteRequestFulfilled,
  },
});

export default documentsSlice;
