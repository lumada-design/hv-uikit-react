import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const notificationMap = {
  success: "positive",
  warning: "warning",
  error: "negative",
  default: "info",
  info: "info",
  accent: "accent",
} as const;

export const { staticClasses, useClasses } = createClasses("HvStatusIcon", {
  root: {
    borderRadius: theme.radii.round,
    lineHeight: 0,
    flexShrink: 0,
    padding: theme.space.xxs,
    "--icsize": "auto",

    [`:not([data-type="simple"])`]: {
      outline: "1px solid currentcolor",
    },
    ...Object.fromEntries(
      Object.entries(notificationMap).map(([variant, color]) => [
        [`&[data-variant="${variant}"]`],
        {
          color: theme.colors[color],
          outline: `1px solid ${theme.colors[`${color}Border`]}`,
          backgroundColor: theme.colors[`${color}Dimmed`],
          [`&[data-type="simple"]`]: {
            outline: "none",
            backgroundColor: "transparent",
          },
        },
      ]),
    ),
    [`&[data-variant="default"]`]: {
      color: theme.colors.text,
      backgroundColor: theme.colors.bgContainerSecondary,
      outline: `1px solid ${theme.colors.borderSubtle}`,
      [`&[data-type="simple"]`]: {
        outline: "none",
        backgroundColor: "transparent",
      },
    },
  },
  icon: {
    fontSize: "inherit",
  },
});
