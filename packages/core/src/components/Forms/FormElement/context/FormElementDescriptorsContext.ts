import React from "react";

export const HvFormElementDescriptorsContext = React.createContext<{
  input?: any;
  label?: any;
}>({});

export const HvFormElementDescriptorsContextProvider =
  HvFormElementDescriptorsContext.Provider;
export const HvFormElementDescriptorsContextConsumer =
  HvFormElementDescriptorsContext.Consumer;
export default HvFormElementDescriptorsContext;
