import { getClasses } from "utils";

export type HvFormElementClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const formElementClasses = getClasses<HvFormElementClasses>(
  classKeys,
  "HvFormElement"
);

export * from "./FormElement";
export * from "./context/FormElementContext";
export * from "./context/FormElementValueContext";
export * from "./context/FormElementDescriptorsContext";
export * from "./utils/FormUtils";
export * from "./validationStates";
