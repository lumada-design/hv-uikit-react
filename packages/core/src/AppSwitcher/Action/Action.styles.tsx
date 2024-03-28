import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvAppSwitcher-Action",
  {
    root: {
      width: "100%",
      maxWidth: 280,
      minHeight: 52,
      marginRight: theme.space.sm,
    },
    icon: { display: "flex", minWidth: 40, justifyContent: "center" },
    iconUrl: { width: 32 },
    iconInfo: { minWidth: 32 },
    disabled: {},
    selected: {},
    typography: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",

      width: "100%",
      minHeight: 52,

      padding: `6px ${theme.space.xs}`,

      border: "none",
      borderLeft: `solid 2px ${theme.colors.secondary}`,

      cursor: "pointer",

      textDecoration: "inherit",
      color: "inherit",
      backgroundColor: "inherit",

      "$disabled &": {
        cursor: "not-allowed",
      },
    },
    title: {
      flexGrow: 1,
      whiteSpace: "normal",
      textAlign: "left",
      margin: `0 ${theme.space.xs}`,
      textWrap: "balance",
      ...theme.typography.label,
    },
    titleAnchor: {
      WebkitLineClamp: 2,
    },
  },
);
