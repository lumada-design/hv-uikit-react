import { tooltipClasses as MuitooltipClasses } from "@mui/material/Tooltip";
import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvTooltip", {
  root: {},
  tooltip: {
    ...theme.typography.body,
    display: "flex",
    width: "fit-content",
    maxWidth: 532,
    backgroundColor: theme.colors.bgContainer,
    boxShadow: theme.colors.shadow,
    padding: theme.space.sm,
    borderRadius: theme.radii.round,
  },
  popper: {
    // TODO: remove these overrides in v6
    [`& .${MuitooltipClasses.tooltip}`]: {
      "& p": {
        display: "-webkit-box",
        width: "fit-content",
        boxOrient: "vertical",
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
    },
    "& $title": {
      padding: "15px 20px",
      borderBottom: `3px solid ${theme.colors.borderSubtle}`,
    },
    "& $valuesContainer": {
      padding: theme.space.sm,
    },
    "& $values": {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "10px",
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    "& $color": {
      width: theme.space.xs,
    },
    "& $separator": {
      width: theme.space.xs,
    },
    "& $separatorColor": {
      width: "5px",
    },
    "& $valueWrapper": {
      padding: theme.space.sm,
    },
    "& $tooltip": {
      "& p": {
        wordBreak: "break-word",
      },
    },
  },
  // TODO: remove in v6
  /** @deprecated */
  tooltipMulti: {},
  /** @deprecated */
  title: {},
  /** @deprecated */
  valuesContainer: {},
  /** @deprecated */
  values: {},
  /** @deprecated */
  color: {},
  /** @deprecated */
  separatorColor: {},
  /** @deprecated */
  separator: {},
  /** @deprecated */
  valueWrapper: {},
});
