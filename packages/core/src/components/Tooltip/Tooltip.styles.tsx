import { tooltipClasses as MuitooltipClasses } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";

export const singleStyle = {
  maxWidth: 532,
  padding: "15px 20px",
  display: "flex",
  backgroundColor: theme.colors.atmo1,
  boxShadow: theme.shadows.md,
  width: "fit-content",
  "& p": {
    display: "-webkit-box",
    width: "fit-content",
    boxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    wordBreak: "break-word",
    color: theme.colors.acce1,
  },
};

export const multiStyle = {
  maxWidth: 532,
  padding: 0,
  display: "flex",
  backgroundColor: theme.colors.atmo1,
  boxShadow: theme.shadows.sm,
  width: "fit-content",
  "& p": {
    display: "-webkit-box",
    width: "fit-content",
    boxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    color: theme.colors.acce1,
  },
};

export const popperSx = (useSingle: boolean) => {
  return {
    [`& .${MuitooltipClasses.popper}`]: {
      opacity: 1,
    },
    [`& .${MuitooltipClasses.tooltip}`]: useSingle ? singleStyle : multiStyle,
    "& .title": {
      padding: "15px 20px",
      borderBottom: `3px solid ${theme.colors.atmo2}`,
    },
    "& .valuesContainer": {
      padding: theme.space.sm,
    },
    "& .values": {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "10px",
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    "& .color": {
      width: theme.space.xs,
    },
    "& .separator": {
      width: theme.space.xs,
    },
    "& .separatorColor": {
      width: "5px",
    },
    "& .valueWrapper": {
      padding: theme.space.sm,
    },
  };
};
