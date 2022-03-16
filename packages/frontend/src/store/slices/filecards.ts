import { IFileCard } from 'monotypes/IFileCard.interface';
import {
    createFileCard, deleteFileCardById, getAllFileCards, updateFileCardById
} from 'store/actions/filecards';
import Slices from 'types/enums/Slices';

import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

export const fileCardsAdapter = createEntityAdapter<IFileCard>()

interface FileCardsSliceState {
    loading: boolean;
    fileCards: EntityState<IFileCard>
}

const fileCardsRequestStarted = (state: FileCardsSliceState) => {
    state.loading = true
}

const fileCardUpsertRequestFulfilled = (
    state: FileCardsSliceState,
    { payload }: PayloadAction<IFileCard | null>
) => {
    state.loading = false
    if (payload !== null) {
        fileCardsAdapter.upsertOne(state.fileCards, payload)
    }
}

const fileCardsGetAllRequestFulfilled = (
    state: FileCardsSliceState,
    { payload }: PayloadAction<IFileCard[]>
) => {
    state.loading = false
    fileCardsAdapter.upsertMany(state.fileCards, payload)
}

const fileCardDeleteRequestFulfilled = (
    state: FileCardsSliceState,
    { payload }: PayloadAction<IFileCard["id"] | null>
) => {
    state.loading = false
    if (payload !== null) {
        fileCardsAdapter.removeOne(state.fileCards, payload)
    }
}

const fileCardsSlice = createSlice({
    name: Slices.FileCards,
    initialState: { loading: false, fileCards: fileCardsAdapter.getInitialState() },
    reducers: {},
    extraReducers: {
        [createFileCard.pending.type]: fileCardsRequestStarted,
        [createFileCard.fulfilled.type]: fileCardUpsertRequestFulfilled,
        [createFileCard.rejected.type]: fileCardUpsertRequestFulfilled, 
        [getAllFileCards.pending.type]: fileCardsRequestStarted,
        [getAllFileCards.fulfilled.type]: fileCardsGetAllRequestFulfilled,
        [getAllFileCards.rejected.type]: fileCardsGetAllRequestFulfilled,
        [updateFileCardById.pending.type]: fileCardsRequestStarted,
        [updateFileCardById.fulfilled.type]: fileCardUpsertRequestFulfilled,
        [updateFileCardById.rejected.type]: fileCardUpsertRequestFulfilled,
        [deleteFileCardById.pending.type]: fileCardsRequestStarted,
        [deleteFileCardById.fulfilled.type]: fileCardDeleteRequestFulfilled,
        [deleteFileCardById.rejected.type]: fileCardDeleteRequestFulfilled,
    }
})

export default fileCardsSlice;