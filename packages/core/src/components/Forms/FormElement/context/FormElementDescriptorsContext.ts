import React from "react";

export const HvFormElementDescriptorsContext = React.createContext<{
  input?: any;
}>({});

export const HvFormElementDescriptorsContextProvider =
  HvFormElementDescriptorsContext.Provider;
export const HvFormElementDescriptorsContextConsumer =
  HvFormElementDescriptorsContext.Consumer;
export default HvFormElementDescriptorsContext;
