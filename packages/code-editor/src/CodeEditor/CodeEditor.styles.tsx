import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCodeEditor", {
  root: {
    minHeight: 200,
    border: `solid 1px ${theme.colors.atmo4}`,
    "& .monaco-editor": {},
    "& .monaco-editor .minimap > canvas": {
      borderLeft: `solid 1px ${theme.colors.atmo4}`,
    },
    "& .monaco-editor .margin": {
      background: theme.colors.atmo2,
      borderRight: `solid 1px ${theme.colors.atmo4}`,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider": {
      borderRadius: "5px",
      background: theme.colors.secondary_60,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:hover": {
      background: theme.colors.secondary,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:active": {
      background: theme.colors.secondary,
    },
    "& .monaco-scrollable-element > .visible": {
      background: theme.colors.atmo1,
    },
    "& .monaco-scrollable-element > .visible.horizontal": {
      borderTop: `solid 1px ${theme.colors.atmo4}`,
    },
    "& .monaco-scrollable-element > .visible.vertical": {
      borderLeft: `solid 1px ${theme.colors.atmo4}`,
    },
    "& .monaco-editor .scroll-decoration": {
      display: "none",
    },
    "& .monaco-editor .minimap-shadow-visible": {
      display: "none",
    },
  },
});
