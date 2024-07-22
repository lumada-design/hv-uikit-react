import React from "react";

export interface HvFormElementDescriptorsContextValue {
  input?: any;
  label?: any;
  descriptors?: any;
}

export const HvFormElementDescriptorsContext =
  React.createContext<HvFormElementDescriptorsContextValue>({});

export const HvFormElementDescriptorsContextProvider =
  HvFormElementDescriptorsContext.Provider;
export const HvFormElementDescriptorsContextConsumer =
  HvFormElementDescriptorsContext.Consumer;
export default HvFormElementDescriptorsContext;
