import DocumentsService from 'api/services/documents';
import Slices from 'types/enums/Slices';
import { IDocument } from 'types/interfaces/document';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface UpdateByIdProps {
    id: number;
    document: IDocument;
}

export const createDocument = createAsyncThunk(
    `${Slices.Documents}/create`,
    async (
        document: Omit<IDocument, "id">,
        { rejectWithValue }
    ): Promise<IDocument> => {
        try {
            const createdDocument: IDocument = await DocumentsService.create(document)
            return createdDocument
        } catch (e) {
            throw rejectWithValue(null)
        }
    }
)

export const getAllDocuments = createAsyncThunk(
    `${Slices.Documents}/getAll`,
    async ( _, { rejectWithValue }): Promise<IDocument[]> => {
        try {
            const documents = await DocumentsService.getAll();
            return documents
        } catch (e) {
            throw rejectWithValue([])
        }
    }
)

export const updateDocumentById = createAsyncThunk(
    `${Slices.Documents}/updateById`,
    async (
        {id, document}: UpdateByIdProps,
        {rejectWithValue}
        ): Promise<IDocument> => {
            try {
                const updatedDocument = await DocumentsService.updateById(id, document)
                return updatedDocument
            } catch (e) {
                throw rejectWithValue(null)
            }
        }
)

export const deleteDocumentById = createAsyncThunk(
    `${Slices.Documents}/deleteById`,
    async (
        id: number,
        { rejectWithValue }
    ): Promise<number> => {
        try {
            const removedId = await DocumentsService.deleteById(id)
            return removedId
        } catch (e) {
            throw rejectWithValue(null)
        }
    }
)