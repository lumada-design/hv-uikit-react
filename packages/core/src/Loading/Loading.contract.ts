import type { HvContract } from "../types/contract";
import type { HvLoadingProps } from "./Loading";

export const contract = {
  name: "HvLoading",
  parts: ["HvLoadingContainer"],
  rules: ["data/states", "tokens/color"],
  states: {
    hidden:
      "Removes the indicator from layout; tie it to the real process (hidden={!isLoading}).",
    small:
      "Compact indicator for inline or dense contexts; defaults to the text color.",
    label:
      "Visible text under the indicator; say what is loading when the context does not.",
  },
  tokens: { color: "Theme color tokens only; primary by default." },
  antiPatterns: [
    {
      id: "known-shape",
      dont: "Use HvLoading as a placeholder for content whose shape is known.",
      why: "It does not reserve the content's space, so the layout jumps.",
      instead: "Use HvSkeleton shaped like the content.",
    },
    {
      id: "label",
      dont: "Show HvLoading without a label when the context does not say what is loading.",
      why: "The user cannot tell what is in progress.",
      instead: 'Add label="Loading results" or similar.',
    },
  ],
  a11y: {
    role: 'none by default; add role="progressbar" when the user is waiting on it',
    requirements: [
      "Give it an accessible name with label or aria-label.",
      "hidden removes it from assistive technology; hide it only after the process ends.",
    ],
  },
} as const satisfies HvContract<HvLoadingProps>;
