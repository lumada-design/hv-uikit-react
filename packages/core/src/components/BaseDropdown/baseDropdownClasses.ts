import { getClasses } from "@core/utils";

export interface HvBaseDropdownClasses {
  root?: string;
  rootDisabled?: string;
  anchor?: string;
  container?: string;
  header?: string;
  headerOpen?: string;
  headerOpenUp?: string;
  headerOpenDown?: string;
  headerDisabled?: string;
  headerReadOnly?: string;
  arrow?: string;
  selection?: string;
  placeholder?: string;
  selectionDisabled?: string;
  panel?: string;
  inputExtensionOpen?: string;
  inputExtensionLeftPosition?: string;
  inputExtensionOpenShadow?: string;
  inputExtensionFloatRight?: string;
  inputExtensionFloatLeft?: string;
}

const classKeys: (keyof HvBaseDropdownClasses)[] = [
  "root",
  "rootDisabled",
  "anchor",
  "container",
  "header",
  "headerOpen",
  "headerOpenUp",
  "headerOpenDown",
  "headerDisabled",
  "headerReadOnly",
  "arrow",
  "selection",
  "placeholder",
  "selectionDisabled",
  "panel",
  "inputExtensionOpen",
  "inputExtensionLeftPosition",
  "inputExtensionOpenShadow",
  "inputExtensionFloatRight",
  "inputExtensionFloatLeft",
];

const baseDropdownClasses = getClasses(classKeys, "HvBaseDropdown");

export default baseDropdownClasses;
