import { getClasses } from "utils";

export type HvInputClasses = {
  /** Styles applied to the root container of the input. */
  root?: string;
  /** Styles applied to the root container when the suggestion list is open. */
  hasSuggestions?: string;
  /** Styles applied to input root which is comprising of everything but the labels and descriptions. */
  inputRoot?: string;
  /** Styles applied to the base input border element. */
  inputBorderContainer?: string;
  /** Styles applied to input root when it is focused. */
  inputRootFocused?: string;
  /** Styles applied to input html element when it is disabled. */
  inputRootDisabled?: string;
  /** Styles applied to input html element when it is multiline mode. */
  inputRootMultiline?: string;
  /** Styles applied to input html element. */
  input?: string;
  /** Styles applied to the container of the labels elements. */
  labelContainer?: string;
  /** Styles applied to the label element. */
  label?: string;
  /** Styles applied to the icon information text. */
  description?: string;
  /** Styles applied to the error area. */
  error?: string;
  /** Styles applied to the div around the adornment. */
  adornmentsBox?: string;
  /** Styles applied to the the adornment when behaving as a button. */
  adornmentButton?: string;
  /** Styles applied to the input adornment icons. */
  icon?: string;
  /** Styles applied to the icon used to clean the input. */
  iconClear?: string;
  /** Styles applied to the input extension shown when the suggestions list is visible. */
  inputExtension?: string;
  /** Styles applied to the container of the suggestions list. */
  suggestionsContainer?: string;
  /** Styles applied to the suggestions list. */
  suggestionList?: string;
};

const classKeys: string[] = [
  "root",
  "hasSuggestions",
  "inputRoot",
  "inputBorderContainer",
  "inputRootFocused",
  "inputRootDisabled",
  "inputRootMultiline",
  "input",
  "labelContainer",
  "label",
  "description",
  "error",
  "adornmentsBox",
  "adornmentButton",
  "icon",
  "iconClear",
  "inputExtension",
  "suggestionsContainer",
  "suggestionList",
];

export const inputClasses = getClasses<HvInputClasses>(classKeys, "HvInput");

export * from "./Input";
