import { getClasses } from "utils";

export type HvBaseDropdownClasses = {
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
};

const classKeys: string[] = [
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

export const baseDropdownClasses = getClasses<HvBaseDropdownClasses>(
  classKeys,
  "HvBaseDropdown"
);

export * from "./BaseDropdown";
