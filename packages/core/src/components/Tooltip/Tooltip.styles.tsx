import { theme } from "@hitachivantara/uikit-styles";
import { tooltipClasses as MuitooltipClasses } from "@mui/material";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTooltip", {
  root: {},
  tooltip: {},
  tooltipMulti: {},
  popper: {
    [`& .${MuitooltipClasses.popper}`]: {
      opacity: 1,
    },
    [`& .${MuitooltipClasses.tooltip}`]: {
      fontFamily: theme.fontFamily.body,
      ...theme.typography.body,
      display: "flex",
      width: "fit-content",
      maxWidth: 532,
      backgroundColor: theme.colors.atmo1,
      boxShadow: theme.colors.shadow,
      padding: 0,

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
      borderBottom: `3px solid ${theme.colors.atmo2}`,
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
      padding: "15px 20px",
      borderRadius: theme.radii.round,
      "& p": {
        wordBreak: "break-word",
      },
    },
  },
  title: {},
  valuesContainer: {},
  values: {},
  color: {},
  separatorColor: {},
  separator: {},
  valueWrapper: {},
});
