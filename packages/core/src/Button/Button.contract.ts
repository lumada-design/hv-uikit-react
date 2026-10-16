import type { HvContract } from "../types/contract";
import type { HvButtonProps } from "./Button";

export const contract = {
  name: "HvButton",
  rules: ["tokens/color", "components/prefer", "destructive/confirm"],
  variants: {
    primary:
      "Default. The main action of a view, form or dialog; use one per context.",
    primarySubtle: "Secondary emphasis in the primary color.",
    primaryGhost: "Tertiary emphasis in the primary color.",
    secondarySubtle: "Secondary action with a visible container.",
    secondaryGhost:
      "Secondary action with the lowest visual weight, e.g. Cancel next to a primary action.",
    negativeGhost:
      "Destructive action (delete, remove, discard); see destructive/confirm.",
    positiveGhost: "Tertiary action with a positive meaning.",
    warningGhost: "Tertiary action that needs the user's attention.",
    ghost: "Tertiary emphasis, lowest visual weight.",
    secondary: "Deprecated; use secondarySubtle or secondaryGhost.",
    semantic:
      "Inherits its color from the surrounding context; only for custom color contexts.",
  },
  states: {
    disabled:
      "Click handlers do not fire and the button leaves the tab order unless focusableWhenDisabled is set.",
    selected:
      "Implies aria-pressed toggle semantics; only for true toggles such as a view-mode switch.",
    focusableWhenDisabled:
      "Keeps a disabled button in the tab order so the reason it is disabled stays discoverable.",
    icon: "Renders an icon-only button; it has no text, so it needs aria-label.",
  },
  tokens: {
    color: "Semantic variants or theme color tokens only.",
    size: "Size tokens xs, sm, md, lg, xl; never raw pixel values.",
    radius: "Radius tokens; never raw pixel values.",
  },
  antiPatterns: [
    {
      id: "variant",
      dont: "Invent variant names.",
      why: "Unknown variants fall back to defaults and lose their meaning.",
      instead:
        "Use one of the defined variants, e.g. primary, secondaryGhost, negativeGhost.",
      enforcement: "checked",
    },
    {
      id: "main-action",
      dont: "Use a subtle or ghost variant for the main action.",
      why: "It lowers the emphasis of the action the user came to do.",
      instead: 'Use variant="primary" (the default) for the main action.',
    },
    {
      id: "selected-toggle",
      dont: "Use selected for momentary or transient states.",
      why: "selected implies aria-pressed toggle semantics.",
      instead: "Use selected only for true toggles, with aria-pressed.",
    },
    {
      id: "icon-name",
      dont: "Render an icon-only button without an accessible name.",
      why: "Screen readers announce nothing for it.",
      instead: 'Add aria-label, e.g. <HvButton icon aria-label="Refresh">.',
      enforcement: "checked",
    },
    {
      id: "color-and-variant",
      dont: "Combine a semantic variant with the color prop.",
      why: "The two compete and the result is unpredictable.",
      instead: 'Choose either variant="negativeGhost" or color, not both.',
    },
  ],
  a11y: {
    role: "button",
    requirements: [
      "Needs an accessible name from its children or aria-label.",
      "Disabled uses aria-disabled; without focusableWhenDisabled it is not in the tab order.",
      "selected sets aria-pressed; use it only for toggle buttons.",
    ],
  },
  props: { hide: ["ref", "className"] },
} as const satisfies HvContract<HvButtonProps>;
