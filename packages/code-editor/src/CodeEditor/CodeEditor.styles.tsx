import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCodeEditor", {
  root: {
    minHeight: 200,
    border: `solid 1px ${theme.colors.divider}`,
    "& .monaco-editor": {},
    "& .monaco-editor .minimap > canvas": {
      borderLeft: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-editor .margin": {
      background: theme.colors.bgPage,
      borderRight: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider": {
      borderRadius: "5px",
      background: theme.colors.textDisabled,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:hover": {
      background: theme.colors.text,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:active": {
      background: theme.colors.text,
    },
    "& .monaco-scrollable-element > .visible": {
      background: theme.colors.bgSurface,
    },
    "& .monaco-scrollable-element > .visible.horizontal": {
      borderTop: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-scrollable-element > .visible.vertical": {
      borderLeft: `solid 1px ${theme.colors.divider}`,
    },
    "& .monaco-editor .scroll-decoration": {
      display: "none",
    },
    "& .monaco-editor .minimap-shadow-visible": {
      display: "none",
    },
  },
});
