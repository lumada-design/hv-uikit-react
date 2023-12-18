import React, { createContext, useMemo, useReducer } from "react";

interface SetItemFocused {
  type: "setItemFocused";
  itemFocused: EventTarget & Element;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setItemFocused":
      return { itemFocused: action.itemFocused };
    default:
      return state;
  }
};

const initialState = { itemFocused: undefined, dispatch: undefined };

export const FocusContext = createContext<{
  itemFocused?: EventTarget & Element;
  dispatch?: React.Dispatch<SetItemFocused>;
}>(initialState);

export const FocusProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );
  const { children } = props;

  return (
    <FocusContext.Provider value={contextValue}>
      {children}
    </FocusContext.Provider>
  );
};
