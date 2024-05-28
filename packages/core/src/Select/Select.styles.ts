import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSelect", {
  root: {
    position: "relative",
    "&$disabled,&$readOnly": {
      pointerEvents: "none",
    },
  },
  disabled: {},
  readOnly: {},
  invalid: {
    border: `1px solid ${theme.colors.error}`,
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    display: "block",
    paddingBottom: 6,
  },
  description: {},
  select: {},
  popper: {
    zIndex: theme.zIndices.popover,
  },
  panel: {
    border: `1px solid ${theme.colors.text}`,
    marginTop: -1,
    marginBottom: -1,
  },
  panelOpenedUp: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
  },
  panelOpenedDown: {
    borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
  },
  error: {},
});
