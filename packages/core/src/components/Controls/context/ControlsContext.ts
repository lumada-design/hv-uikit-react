import React from "react";

export const HvControlsContext = React.createContext<{
  onSearch?: any;
  onSort?: any;
}>({});

export const HvControlsContextProvider = HvControlsContext.Provider;
export const HvControlsContextConsumer = HvControlsContext.Consumer;
export default HvControlsContext;
