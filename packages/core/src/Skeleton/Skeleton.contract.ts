import type { HvContract } from "../types/contract";
import type { HvSkeletonProps } from "./Skeleton";

export const contract = {
  name: "HvSkeleton",
  rules: ["data/states", "tokens/color"],
  variants: {
    text: "Default. Lines of text.",
    circle: "Avatars and round media.",
    square: "Images and media.",
  },
  states: {
    animation: "pulse (default) or wave; use one animation per screen.",
    width: "Size it like the content it replaces so the layout does not shift.",
    height:
      "Size it like the content it replaces so the layout does not shift.",
    hidden:
      "When true, the placeholder is removed and children show; use it to reveal loaded content.",
  },
  tokens: {
    color:
      "Uses the page background token; override only through classes with theme tokens.",
    radius: "Theme radius tokens; no custom border radius.",
  },
  antiPatterns: [
    {
      id: "loaded-content",
      dont: "Show a skeleton for content that is already loaded.",
      why: "It hides real data.",
      instead: "Render the content directly.",
    },
    {
      id: "indefinite",
      dont: "Use a skeleton for a process with no known content shape.",
      why: "It implies a shape that will not appear.",
      instead: "Use HvLoading.",
    },
  ],
  a11y: {
    role: "none by default (decorative)",
    requirements: [
      'When it stands in for loading content, add role="progressbar" and an aria-label such as "Loading datasets".',
      "Children are hidden from assistive technology while the placeholder is active.",
    ],
  },
} as const satisfies HvContract<HvSkeletonProps>;
