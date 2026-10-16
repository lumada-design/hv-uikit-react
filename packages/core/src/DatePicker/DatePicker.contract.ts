import type { HvContract } from "../types/contract";
import type { HvDatePickerProps } from "./DatePicker";

export const contract = {
  name: "HvDatePicker",
  rules: ["date/format"],
  states: {
    value: "A Date, never a string; controlled together with onChange.",
    rangeMode: "Selects a start and end date; onChange receives both.",
    locale:
      "Locale for the calendar and the displayed value; pass the user's locale.",
    showActions: "Shows Apply and Cancel; the value changes only on Apply.",
    label: "Visible label; required unless aria-label is set.",
  },
  antiPatterns: [
    {
      id: "string-value",
      dont: "Pass a date string to value.",
      why: "value is a Date; strings are parsed differently across browsers and time zones.",
      instead: "Convert at the edge: value={new Date(iso)}.",
    },
    {
      id: "text-input",
      dont: "Use a text HvInput for dates.",
      why: "Users must guess the format and validation has to be hand-written.",
      instead: "Use HvDatePicker.",
    },
    {
      id: "label",
      dont: "Render HvDatePicker without a label or aria-label.",
      why: "The field has no accessible name.",
      instead:
        "Set label, or aria-label when a visible label exists elsewhere.",
    },
  ],
  a11y: {
    requirements: [
      "Needs label or aria-label.",
      "Error messages use status and statusMessage so they are announced.",
    ],
  },
} as const satisfies HvContract<HvDatePickerProps>;
