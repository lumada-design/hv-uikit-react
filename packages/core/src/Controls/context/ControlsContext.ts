import { createContext } from "react";

export const HvControlsContext = createContext<{
  onSearch?: any;
  onSort?: any;
}>({});

export const HvControlsContextProvider = HvControlsContext.Provider;
export const HvControlsContextConsumer = HvControlsContext.Consumer;
export default HvControlsContext;
