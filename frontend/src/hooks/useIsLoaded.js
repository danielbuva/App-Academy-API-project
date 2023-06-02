import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../store/session";

export default function useIsLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded;
}
