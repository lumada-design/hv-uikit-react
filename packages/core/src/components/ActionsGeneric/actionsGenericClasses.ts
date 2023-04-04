import { getClasses } from "~/utils";

export interface HvActionsGenericClasses {
  /** Styles applied to element root. */
  root?: string;
  /** Styles applied to the visible buttons. */
  button?: string;
  /** Styles applied to the action container wrapper. */
  actionContainer?: string;
  /** Styles applied to the DropDownMenu component. */
  dropDownMenu?: string;
  /** Styles applied to the DropDownMenu IconButton component. */
  dropDownMenuButton?: string;
  /** Styles applied to the DropDownMenu IconButton component when it is selected. */
  dropDownMenuButtonSelected?: string;
}

const classKeys: string[] = [
  "root",
  "button",
  "actionContainer",
  "dropDownMenu",
  "dropDownMenuButton",
  "dropDownMenuButtonSelected",
];

const actionsGenericClasses = getClasses<HvActionsGenericClasses>(
  classKeys,
  "HvActionsGeneric"
);

export default actionsGenericClasses;
