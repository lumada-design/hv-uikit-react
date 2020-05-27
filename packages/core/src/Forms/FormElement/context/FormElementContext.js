import React from "react";

const HvFormElementContext = React.createContext({});

export const HvFormElementContextProvider = HvFormElementContext.Provider;
export const HvFormElementContextConsumer = HvFormElementContext.Consumer;
export default HvFormElementContext;
