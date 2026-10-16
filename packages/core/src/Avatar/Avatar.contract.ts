import type { HvContract } from "../types/contract";
import type { HvAvatarProps } from "./Avatar";

export const contract = {
  name: "HvAvatar",
  parts: ["HvAvatarGroup"],
  rules: ["tokens/color"],
  variants: {
    circular: "Default. For people and user profiles.",
    square: "For brands, products and logos.",
  },
  states: {
    status:
      "Colored border for presence (positive = online, negative = offline, warning = away); also say it in text.",
    badge: "Colored dot overlay for notifications or a secondary status.",
    src: "Shows the image; when it is missing or fails to load, the fallback (icon or initials) shows.",
    size: "Avatar size; inside HvAvatarGroup it scales down one level.",
  },
  tokens: {
    size: "Size tokens xs, sm, md, lg, xl; never raw pixel values.",
    color:
      "Semantic color tokens for status and badge; let HvAvatarGroup control backgrounds.",
  },
  antiPatterns: [
    {
      id: "variant",
      dont: "Use variants other than circular or square.",
      why: "Unknown variants fall back to the default shape.",
      instead:
        'Use variant="circular" for people or variant="square" for brands.',
      enforcement: "checked",
    },
    {
      id: "alt",
      dont: "Set src without alt.",
      why: "The image has no accessible name.",
      instead: 'Always pass alt with src, e.g. alt="John Doe".',
      enforcement: "checked",
    },
    {
      id: "image-and-initials",
      dont: "Pass both src and initials expecting both to show.",
      why: "The image wins; initials are only the fallback.",
      instead: "Provide src, or initials as children, not both.",
    },
    {
      id: "group-background",
      dont: "Set backgroundColor on avatars inside HvAvatarGroup.",
      why: "The group controls avatar styling.",
      instead:
        "Remove backgroundColor and let HvAvatarGroup style the avatars.",
    },
    {
      id: "decorative-status",
      dont: "Use status or badge colors for decoration.",
      why: "They read as presence or notifications.",
      instead: "Use status and badge only for real states.",
    },
  ],
  a11y: {
    role: "img (implicit when showing an image or initials)",
    requirements: [
      "alt is required when src is set; icon-only avatars use aria-label.",
      'Announce status in the label, e.g. "John Doe, online".',
      "Inside HvAvatarGroup the group carries the semantics; avatars are presentational.",
    ],
  },
} as const satisfies HvContract<HvAvatarProps>;
