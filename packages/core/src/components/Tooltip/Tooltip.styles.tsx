import { theme } from "@hitachivantara/uikit-styles";
import { tooltipClasses as MuitooltipClasses } from "@mui/material";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTooltip", {
  root: {},
  tooltip: {},
  tooltipMulti: {},
  popper: {},
  title: {},
  valuesContainer: {},
  values: {},
  color: {},
  separatorColor: {},
  separator: {},
  valueWrapper: {},
});

export const popperSx = (useSingle: boolean) => {
  return {
    [`& .${MuitooltipClasses.popper}`]: {
      opacity: 1,
    },
    [`& .${MuitooltipClasses.tooltip}`]: {
      ...theme.typography.body,
      display: "flex",
      width: "fit-content",
      maxWidth: 532,
      backgroundColor: theme.colors.atmo1,
      boxShadow: theme.colors.shadow,
      padding: 0,
      ...(useSingle && {
        padding: "15px 20px",
        borderRadius: theme.tooltip.borderRadius,
      }),

      "& p": {
        display: "-webkit-box",
        width: "fit-content",
        boxOrient: "vertical",
        textOverflow: "ellipsis",
        overflow: "hidden",
        ...(useSingle && { wordBreak: "break-word" }),
      },
    },
    [`& .${staticClasses.title}`]: {
      padding: "15px 20px",
      borderBottom: `3px solid ${theme.colors.atmo2}`,
    },
    [`& .${staticClasses.valuesContainer}`]: {
      padding: theme.space.sm,
    },
    [`& .${staticClasses.values}`]: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "10px",
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    [`& .${staticClasses.color}`]: {
      width: theme.space.xs,
    },
    [`& .${staticClasses.separator}`]: {
      width: theme.space.xs,
    },
    [`& .${staticClasses.separatorColor}`]: {
      width: "5px",
    },
    [`& .${staticClasses.valueWrapper}`]: {
      padding: theme.space.sm,
    },
  };
};
