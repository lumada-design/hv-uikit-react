import { useCallback, useState } from "react";

export function useSavedState<T>(
  defaultState: T
): [T | undefined, (v?: T, s?: boolean) => void, () => void, T | undefined, T] {
  const [initialState] = useState<T>(defaultState);

  const [state, setState] = useState<T | undefined>(initialState);
  const [submittedState, setSubmittedState] = useState<T | undefined>(
    initialState
  );

  const changeState = useCallback((value?: T, save = false) => {
    setState(value);
    if (save) setSubmittedState(value);
  }, []);

  const rollback = () => {
    setState(submittedState);
  };

  return [state, changeState, rollback, submittedState, initialState];
}
