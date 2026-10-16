import type { HvContract } from "../types/contract";
import type { HvCheckBoxProps } from "./CheckBox";

export const contract = {
  name: "HvCheckBox",
  parts: ["HvCheckBoxGroup"],
  rules: ["components/prefer"],
  states: {
    checked: "Controlled checked state; pair with onChange.",
    indeterminate:
      "Mixed state, e.g. some but not all items of a group selected; say so in the label or helper text.",
    disabled: "Not interactive and out of the tab order; tell the user why.",
    readOnly:
      "Visible and focusable but not editable; rarely the right pattern.",
    required: "Form validation requires it to be checked.",
    semantic:
      "Inherits its color from the context; only for custom color contexts.",
  },
  tokens: {
    color: "Semantic color tokens, or inherited when semantic is set.",
  },
  antiPatterns: [
    {
      id: "label",
      dont: "Render a checkbox without label or aria-label.",
      why: "Screen readers cannot announce its purpose.",
      instead: "Set label, or aria-label when the label is elsewhere.",
    },
    {
      id: "controlled-and-uncontrolled",
      dont: "Set both checked and defaultChecked.",
      why: "The component cannot be controlled and uncontrolled at once.",
      instead: "Use checked with onChange, or defaultChecked alone.",
    },
    {
      id: "silent-disabled",
      dont: "Disable a checkbox without saying why.",
      why: "Users cannot tell how to enable it.",
      instead: "Add helper text that explains the condition.",
    },
  ],
  a11y: {
    role: "checkbox",
    requirements: [
      "Needs an accessible name from label or aria-label.",
      "status and statusMessage set aria-invalid and the described-by message.",
    ],
  },
} as const satisfies HvContract<HvCheckBoxProps>;
