import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTextArea", {
  root: { display: "inline-block", width: "100%" },
  disabled: {},
  resizable: { width: "100%" },
  invalid: {},
  baseInput: { clear: "both", float: "left" },
  input: {},
  inputResizable: { width: "100%", resize: "both" },
  labelContainer: { float: "left", display: "flex", alignItems: "flex-start" },
  label: { display: "block", float: "left", paddingBottom: "6px" },
  description: { display: "block", float: "left" },
  characterCounter: {
    display: "block",
    float: "right",
    textAlign: "right",
    marginBottom: "6px",
  },
  error: { float: "left" },
});
