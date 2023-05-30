import { tooltipClasses as MuitooltipClasses } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import tooltipClasses from "./tooltipClasses";

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
    [`& .${tooltipClasses.title}`]: {
      padding: "15px 20px",
      borderBottom: `3px solid ${theme.colors.atmo2}`,
    },
    [`& .${tooltipClasses.valuesContainer}`]: {
      padding: theme.space.sm,
    },
    [`& .${tooltipClasses.values}`]: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "10px",
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    [`& .${tooltipClasses.color}`]: {
      width: theme.space.xs,
    },
    [`& .${tooltipClasses.separator}`]: {
      width: theme.space.xs,
    },
    [`& .${tooltipClasses.separatorColor}`]: {
      width: "5px",
    },
    [`& .${tooltipClasses.valueWrapper}`]: {
      padding: theme.space.sm,
    },
  };
};
