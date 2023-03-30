import { tooltipClasses as MuitooltipClasses } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import tooltipClasses from "./tooltipClasses";

export const singleStyle = {
  maxWidth: 532,
  padding: "15px 20px",
  display: "flex",
  backgroundColor: theme.colors.atmo1,
  borderRadius: theme.tooltip.borderRadius,
  boxShadow: theme.colors.shadow,
  width: "fit-content",
  "& p": {
    display: "-webkit-box",
    width: "fit-content",
    boxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    wordBreak: "break-word",
    color: theme.colors.secondary,
  },
};

export const multiStyle = {
  maxWidth: 532,
  padding: 0,
  display: "flex",
  backgroundColor: theme.colors.atmo1,
  boxShadow: theme.colors.shadow,
  width: "fit-content",
  "& p": {
    display: "-webkit-box",
    width: "fit-content",
    boxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    color: theme.colors.secondary,
  },
};

export const popperSx = (useSingle: boolean) => {
  return {
    [`& .${MuitooltipClasses.popper}`]: {
      opacity: 1,
    },
    [`& .${MuitooltipClasses.tooltip}`]: useSingle ? singleStyle : multiStyle,
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
