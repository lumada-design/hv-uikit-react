import type { HvContract } from "../types/contract";
import type { HvDialogProps } from "./Dialog";

export const contract = {
  name: "HvDialog",
  parts: ["HvDialogTitle", "HvDialogContent", "HvDialogActions"],
  rules: ["destructive/confirm", "tokens/space"],
  variants: {
    success: "Status bar in the positive color; reports a completed action.",
    error:
      "Status bar in the negative color; reports a failure that needs attention.",
    warning:
      "Status bar in the warning color; reports a condition that needs attention. For confirmations, see destructive/confirm.",
  },
  states: {
    open: "Controlled by the consumer; the dialog shows only while open is true.",
    onClose:
      "Renders the close button and runs on Escape and backdrop click; without it, only the actions close the dialog.",
    disableBackdropClick:
      "Ignores backdrop clicks and Escape; only for flows that must not be dismissed by accident.",
    maxWidth:
      "Width from the breakpoint values xs to xl, or fullWidth; no custom widths.",
  },
  tokens: {
    space: "Custom layout inside the dialog uses spacing tokens.",
    color: "Status comes from variant; never raw color values.",
  },
  antiPatterns: [
    {
      id: "title",
      dont: "Render the title as plain text or a heading.",
      why: "The title is then not the dialog's accessible name.",
      instead: "Use HvDialogTitle and point aria-labelledby at it.",
    },
    {
      id: "content",
      dont: "Place body content directly in the dialog.",
      why: "Spacing and layout are not applied.",
      instead: "Wrap body content in HvDialogContent.",
    },
    {
      id: "actions",
      dont: "Place buttons outside HvDialogActions, or more than three in it.",
      why: "The action area breaks and too many choices overwhelm the user.",
      instead:
        "Put up to three buttons in HvDialogActions; move other choices into the content.",
    },
    {
      id: "button-variants",
      dont: "Use a subtle or second primary button for the secondary action.",
      why: "It competes with the main action.",
      instead:
        'One variant="primary" for the main action and variant="secondaryGhost" for cancel; for destructive actions, see destructive/confirm.',
    },
  ],
  a11y: {
    role: "dialog (set by the underlying modal)",
    requirements: [
      "Needs an accessible name: aria-labelledby pointing at HvDialogTitle, or aria-label.",
      "Escape closes the dialog when onClose is set, unless disableBackdropClick is true.",
      "The close button is named by buttonTitle; keep it localized.",
      "Content behind the dialog is hidden from assistive technology while open.",
    ],
  },
} as const satisfies HvContract<HvDialogProps>;
