export const buttonVariant = [
  "primary",
  "primarySubtle",
  "primaryGhost",
  "secondarySubtle",
  "secondaryGhost",
  "semantic",
  // deprecated props
  "secondary",
  "ghost",
] as const;
export type HvButtonVariant = (typeof buttonVariant)[number];

export const buttonSize = ["xs", "sm", "md", "lg", "xl"] as const;
export type HvButtonSize = (typeof buttonSize)[number];

export const buttonRadius = [
  "none",
  "base",
  "round",
  "circle",
  "full",
] as const;
export type HvButtonRadius = (typeof buttonRadius)[number];
