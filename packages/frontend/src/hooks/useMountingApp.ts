import useLoadInitialData from "hooks/useLoadInitialData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { authenticateAsync } from "store/actions/profile";

const useMountingApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loadInitialData = useLoadInitialData();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(authenticateAsync()).unwrap();
        loadInitialData();
      } catch (e) {}
    })();
  }, [dispatch, loadInitialData]);
};

export default useMountingApp;
