import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsersAsync } from 'store/actions/users';
import { getAllDocuments } from 'store/actions/documents';
import { getAllGroups } from 'store/actions/groups';

const useLoadInitialData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersAsync());
    dispatch(getAllDocuments());
    dispatch(getAllGroups());
  }, [dispatch]);
};

export default useLoadInitialData;
