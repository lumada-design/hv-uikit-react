import PropTypes from "prop-types";
import { createContext, useMemo, useReducer } from "react";

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

FocusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FocusContext, FocusProvider };
