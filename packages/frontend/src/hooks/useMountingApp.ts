import useLoadInitialData from "hooks/useLoadInitialData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { authenticateAsync } from "store/actions/profile";
import { userIsAuthenticatedSelector } from "store/selectors/profile";

const useMountingApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loadInitialData = useLoadInitialData();
  const userIsAuthenticated = useSelector(userIsAuthenticatedSelector);
  useEffect(() => {
    (async () => {
      if (userIsAuthenticated) {
        try {
          await dispatch(authenticateAsync()).unwrap();
          loadInitialData();
        } catch (e) {}
      }
    })();
  }, [dispatch, userIsAuthenticated, loadInitialData]);
};

export default useMountingApp;
