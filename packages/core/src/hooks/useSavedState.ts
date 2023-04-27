import { useCallback, useState } from "react";

export default function useSavedState(defaultState) {
  const [initialState] = useState(defaultState);

  const [state, setState] = useState(initialState);
  const [submittedState, setSubmittedState] = useState(initialState);

  const changeState = useCallback((value, save = false) => {
    setState(value);
    if (save) setSubmittedState(value);
  }, []);

  const rollback = () => {
    setState(submittedState);
  };

  return [state, changeState, rollback, submittedState, initialState];
}
