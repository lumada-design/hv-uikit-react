import React from "react";

export interface HvFormElementContextValue {
  elementId?: string;
  elementDisabled?: boolean;
  elementRequired?: boolean;
  elementStatus?: string;
  elementReadOnly?: boolean;
  elementName?: string;
}

export const HvFormElementContext =
  React.createContext<HvFormElementContextValue>({});

export const HvFormElementContextProvider = HvFormElementContext.Provider;
export const HvFormElementContextConsumer = HvFormElementContext.Consumer;
export default HvFormElementContext;
