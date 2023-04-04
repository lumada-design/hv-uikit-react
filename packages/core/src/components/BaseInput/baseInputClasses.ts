import { getClasses } from "~/utils";

export type HvBaseInputClasses = {
  /** Styles applied to the root container of the input. */
  root?: string;
  /** Styles applied to the root container of the input when it is disabled. */
  disabled?: string;
  /** Styles applied to the root container of the input when it is invalid. */
  invalid?: string;
  /** Styles applied to the root container of the input when it is resizable. */
  resizable?: string;
  /** Styles applied to input root which is the input that encloses all the other elements. */
  inputRoot?: string;
  /** Styles applied to input root when it is focused. */
  inputRootFocused?: string;
  /** Styles applied to input root element when it is disabled. */
  inputRootDisabled?: string;
  /** Styles applied to input root element when it is multiline mode. */
  inputRootMultiline?: string;
  /** Styles applied to input root element when it is invalid. */
  inputRootInvalid?: string;
  /** Styles applied to input root element when it is read only. */
  inputRootReadOnly?: string;
  /** Styles applied to input html element. */
  input?: string;
  /** Styles applied to input html element when is disabled. */
  inputDisabled?: string;
  /** Styles applied to input html element when it is resizable. */
  inputResizable?: string;
  /** Styles applied to input html element when it is read only. */
  inputReadOnly?: string;
  /** Styles applied to the container of the border element. */
  inputBorderContainer?: string;
  /** Styles applied to the container of the border element, when in read only mode. */
  readOnly?: string;
};

const classKeys: string[] = [
  "root",
  "disabled",
  "invalid",
  "resizable",
  "inputRoot",
  "inputRootFocused",
  "inputRootDisabled",
  "inputRootMultiline",
  "inputRootInvalid",
  "inputRootReadOnly",
  "input",
  "inputDisabled",
  "inputResizable",
  "inputReadOnly",
  "inputBorderContainer",
  "readOnly",
];

const baseInputClasses = getClasses<HvBaseInputClasses>(
  classKeys,
  "HvBaseInput"
);

export default baseInputClasses;
