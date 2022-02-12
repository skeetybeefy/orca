import { RootState } from "store";
import { usersAdapter } from "store/slices/users";

const users = usersAdapter.getSelectors((state: RootState) => state.users.users)

export const selectAllUsers = users.selectAll

export const selectGroupById = users.selectById 