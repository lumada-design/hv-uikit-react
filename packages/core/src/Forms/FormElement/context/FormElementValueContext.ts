import React from "react";

export const HvFormElementValueContext = React.createContext(undefined);

export const HvFormElementValueContextProvider =
  HvFormElementValueContext.Provider;
export const HvFormElementValueContextConsumer =
  HvFormElementValueContext.Consumer;
export default HvFormElementValueContext;
