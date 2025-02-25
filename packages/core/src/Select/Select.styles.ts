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
    borderColor: theme.colors.negativeDeep,
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {},
  description: {},
  select: {},
  popper: {
    zIndex: theme.zIndices.popover,
  },
  panel: {
    maxHeight: 400,
    border: `1px solid ${theme.colors.text}`,
    marginTop: -1,
    marginBottom: -1,

    // panel styles
    position: "relative",
    padding: theme.space.xs,
    backgroundColor: theme.colors.bgContainer,
    overflowY: "auto",
    borderRadius: "inherit",
  },
  panelOpenedUp: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
  },
  panelOpenedDown: {
    borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
  },
  error: {},
});
