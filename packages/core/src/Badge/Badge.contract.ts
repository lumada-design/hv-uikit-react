import type { HvContract } from "../types/contract";
import type { HvBadgeProps } from "./Badge";

export const contract = {
  name: "HvBadge",
  rules: ["tokens/color", "status/semantic-color"],
  states: {
    label: "The count or short content; numeric for counts.",
    showCount: "Shows a numeric label; without it the badge is a dot.",
    maxCount: 'Caps the displayed number, e.g. "99+".',
    icon: "Attaches the badge to an icon.",
    color:
      "Semantic color: negative for alerts, warning for attention, positive for success.",
  },
  tokens: { color: "Semantic color tokens only." },
  antiPatterns: [
    {
      id: "meaningless-count",
      dont: "Show a number without saying what it counts.",
      why: "Users cannot act on it.",
      instead: "Pair it with an element whose label says what is counted.",
    },
    {
      id: "show-count-text",
      dont: "Use showCount with a non-numeric label.",
      why: "showCount is for counts.",
      instead: "Use showCount only with numbers.",
    },
  ],
  a11y: {
    requirements: [
      'When the badge conveys meaning, the parent\'s accessible name includes it, e.g. "Notifications, 3 unread".',
      "Purely decorative badges are hidden from assistive technology.",
    ],
  },
} as const satisfies HvContract<HvBadgeProps>;
