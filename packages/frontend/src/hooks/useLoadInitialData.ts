import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getAllFilesAsync } from "store/actions/files";
import { getAllGroups } from "store/actions/groups";
import { getAllUsersAsync } from "store/actions/users";

const useLoadInitialData = () => {
  const dispatch = useDispatch();
  const loadInitialData = useCallback(() => {
    dispatch(getAllUsersAsync());
    dispatch(getAllFilesAsync());
    dispatch(getAllGroups());
  }, [dispatch]);
  return loadInitialData;
};

export default useLoadInitialData;
