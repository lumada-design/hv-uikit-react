import { createContext } from "react";

export interface HvFormElementContextValue {
  elementId?: string;
  elementDisabled?: boolean;
  elementRequired?: boolean;
  elementStatus?: string;
  elementReadOnly?: boolean;
  elementName?: string;
}

export const HvFormElementContext = createContext<HvFormElementContextValue>(
  {},
);

export interface HvFormElementDescriptorsContextValue {
  input?: any;
  label?: any;
  descriptors?: any;
}

export const HvFormElementDescriptorsContext =
  createContext<HvFormElementDescriptorsContextValue>({});

export const HvFormElementValueContext = createContext<any>(undefined);
