import { getClasses } from "@core/utils";

export interface HvHeaderActionsClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const headerActionsClasses = getClasses<HvHeaderActionsClasses>(
  classKeys,
  "HvHeader-Actions"
);

export default headerActionsClasses;
