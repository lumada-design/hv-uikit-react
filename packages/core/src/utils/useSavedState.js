import { useState } from "react";

export default function useUpdated(defaultState) {
  const [state, setState] = useState(defaultState);
  const [submittedState, setSubmittedState] = useState(defaultState);

  const changeState = (value = state, save = false) => {
    setState(value);
    if (save) setSubmittedState(value);
  };

  const rollback = () => {
    setState(submittedState);
  };

  return [state, changeState, rollback];
}
