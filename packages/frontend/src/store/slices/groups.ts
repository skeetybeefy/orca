import { IGroup } from 'monotypes/IGroup.interface';
import { createGroup, deleteGroupById, getAllGroups, updateGroupById } from 'store/actions/groups';
import Slices from 'types/enums/Slices';

import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

export const groupsAdapter = createEntityAdapter<IGroup>();

interface GroupsSliceState {
  loading: boolean;
  groups: EntityState<IGroup>;
}

const groupsRequestStarted = (state: GroupsSliceState) => {
  state.loading = true;
};

const groupUpsertRequestFulfilled = (
  state: GroupsSliceState,
  { payload }: PayloadAction<IGroup | null>
) => {
  state.loading = false;
  if (payload !== null) {
    groupsAdapter.upsertOne(state.groups, payload);
  }
};

const groupGetAllRequestFulfilled = (
  state: GroupsSliceState,
  { payload }: PayloadAction<IGroup[]>
) => {
  state.loading = false;
  groupsAdapter.upsertMany(state.groups, payload);
};

const groupDeleteRequestFulfilled = (
  state: GroupsSliceState,
  { payload }: PayloadAction<string | null>
) => {
  state.loading = false;
  if (payload !== null) {
    groupsAdapter.removeOne(state.groups, payload);
  }
};

const groupsSlice = createSlice({
  name: Slices.Groups,
  initialState: { loading: false, groups: groupsAdapter.getInitialState() },
  reducers: {},
  extraReducers: {
    [createGroup.pending.type]: groupsRequestStarted,
    [createGroup.fulfilled.type]: groupUpsertRequestFulfilled,
    [createGroup.rejected.type]: groupUpsertRequestFulfilled,
    [getAllGroups.pending.type]: groupsRequestStarted,
    [getAllGroups.fulfilled.type]: groupGetAllRequestFulfilled,
    [getAllGroups.rejected.type]: groupGetAllRequestFulfilled,
    [updateGroupById.pending.type]: groupsRequestStarted,
    [updateGroupById.fulfilled.type]: groupUpsertRequestFulfilled,
    [updateGroupById.rejected.type]: groupUpsertRequestFulfilled,
    [deleteGroupById.pending.type]: groupsRequestStarted,
    [deleteGroupById.fulfilled.type]: groupDeleteRequestFulfilled,
    [deleteGroupById.rejected.type]: groupDeleteRequestFulfilled,
  },
});

export default groupsSlice;
