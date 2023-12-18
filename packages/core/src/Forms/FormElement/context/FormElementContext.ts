import React from "react";

export const HvFormElementContext = React.createContext<{
  elementId?: string;
  elementDisabled?: boolean;
  elementRequired?: boolean;
  elementStatus?: string;
}>({});

export const HvFormElementContextProvider = HvFormElementContext.Provider;
export const HvFormElementContextConsumer = HvFormElementContext.Consumer;
export default HvFormElementContext;
