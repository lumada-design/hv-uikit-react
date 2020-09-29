import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const reducer = (state, action) => {
  switch (action.type) {
    case "setItemFocused":
      return { itemFocused: action.itemFocused };
    default:
      return state;
  }
};

const initialState = { itemFocused: null };
const FocusContext = createContext(initialState);

const FocusProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return <FocusContext.Provider value={{ state, dispatch }}>{children}</FocusContext.Provider>;
};

FocusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FocusContext, FocusProvider };
