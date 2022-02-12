import { RootState } from "store";
import { groupsAdapter } from "store/slices/groups";

const groups = groupsAdapter.getSelectors((state: RootState) => state.groups.groups)

export const selectAllGroups = groups.selectAll

export const selectGroupById = groups.selectById 