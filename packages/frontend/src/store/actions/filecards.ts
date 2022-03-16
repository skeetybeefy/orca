import FileCardsService from 'api/services/filecards';
import { ICreateFileCardDto, IFileCard, IUpdateFileCardDto } from 'monotypes/IFileCard.interface';
import Slices from 'types/enums/Slices';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface FileCardUpdateProps {
    id: IFileCard["id"];
    fileCard: IFileCard;
}

export const createFileCard = createAsyncThunk(
    `${Slices.FileCards}/create`,
    async (fileCard: ICreateFileCardDto, { rejectWithValue }): Promise<IFileCard> => {
        try {
            const createdFileCard: IFileCard = await FileCardsService.create(fileCard)
            return createdFileCard
        } catch (e) {
            throw rejectWithValue(null)
        }
    }
)

export const getAllFileCards = createAsyncThunk(
    `${Slices.FileCards}/getAll`,
    async (_, { rejectWithValue }): Promise<IFileCard[]> => {
        try {
            const fileCards = await FileCardsService.getAll()
            return fileCards
        } catch (e) {
            throw rejectWithValue([])
        }
    }
)

export const updateFileCardById = createAsyncThunk(
    `${Slices.FileCards}/updateById`,
    async (
        { id, fileCard }: FileCardUpdateProps,
        { rejectWithValue }
    ): Promise<IFileCard> => {
        try {
            const updatedFileCard = await FileCardsService.updateById(id, fileCard)
            return updatedFileCard
        } catch (e) {
            throw rejectWithValue(null)
        }
    }
)

export const deleteFileCardById = createAsyncThunk(
    `${Slices.FileCards}/deleteById`,
    async (id: IFileCard["id"], { rejectWithValue }): Promise<IFileCard["id"]> => {
        try {
            const removedId = await FileCardsService.deleteById(id)
            return removedId
        } catch (e) {
            throw rejectWithValue(null)
        }
    }
)