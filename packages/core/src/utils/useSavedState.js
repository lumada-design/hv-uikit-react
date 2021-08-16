import { useState } from "react";

export default function useSavedState(defaultState) {
  const [state, setState] = useState(defaultState);
  const [submittedState, setSubmittedState] = useState(defaultState);

  const changeState = (value = state, save = false) => {
    setState(value);
    if (save) setSubmittedState(value);
  };

  const rollback = () => {
    setState(submittedState);
  };

  const clear = () => {
    setState(undefined);
  };

  return [state, changeState, rollback, clear];
}
