import GroupsService from "api/services/groups";
import Slices from "types/enums/Slices";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ICreateGroupDto,
  IGroup,
  IUpdateGroupDto,
} from "monotypes/IGroup.interface";

interface GroupUpdateProps {
  id: IGroup["id"];
  group: IUpdateGroupDto;
}

export const createGroup = createAsyncThunk(
  `${Slices.Groups}/create`,
  async (group: ICreateGroupDto, { rejectWithValue }): Promise<IGroup> => {
    try {
      const createdGroup: IGroup = await GroupsService.create(group);
      return createdGroup;
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);

export const getAllGroups = createAsyncThunk(
  `${Slices.Groups}/getAll`,
  async (_, { rejectWithValue }): Promise<IGroup[]> => {
    try {
      const groups = await GroupsService.getAll();
      return groups;
    } catch (e) {
      throw rejectWithValue([]);
    }
  }
);

export const updateGroupById = createAsyncThunk(
  `${Slices.Groups}/updateById`,
  async (
    { id, group }: GroupUpdateProps,
    { rejectWithValue }
  ): Promise<IGroup> => {
    try {
      const updatedGroup = await GroupsService.updateById(id, group);
      return updatedGroup;
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);

export const deleteGroupById = createAsyncThunk(
  `${Slices.Groups}/deleteById`,
  async (id: IGroup["id"], { rejectWithValue }): Promise<IGroup["id"]> => {
    try {
      const removedId = await GroupsService.deleteById(id);
      return removedId;
    } catch (e) {
      throw rejectWithValue(null);
    }
  }
);
