import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBox } from "components";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";
import cardClasses from "./cardClasses";

const getColor = (c: string): string => theme.colors[c];

export const StyledRoot = styled(
  HvBox,
  transientOptions
)(({ $selectable, $selected, $bgColor }) => ({
  overflow: "visible",
  position: "relative",
  backgroundColor: getColor($bgColor),
  outline: theme.card.outline,
  borderRadius: theme.card.borderRadius,
  "&.focus-visible": {
    ...outlineStyles,
  },
  "&:focus": {
    outline: "none",
  },
  ...($selectable && {
    "&:hover": {
      outline: `1px solid ${theme.card.hoverColor}`,
    },
  }),
  ...($selected && {
    outline: `1px solid ${theme.colors.acce1}`,
    "&:hover": {
      outline: `1px solid ${theme.colors.acce1}`,
    },
    "&:focus": {
      outline: `1px solid ${theme.colors.acce1}`,
    },
    [`& .${cardClasses.semanticBar}`]: {
      height: 4,
    },
    "& .sema0": {
      backgroundColor: theme.colors.acce1,
    },
  }),
}));

export const StyledContainer = styled("div")({
  position: "relative",
  "& > *": {
    position: "absolute",
    zIndex: 1,
  },
});

export const StyledBar = styled("div")(
  ({ barColor }: { barColor: string }) => ({
    width: "100%",
    height: 2,
    top: -1,
    right: 0,
    backgroundColor: theme.colors[barColor],
    ...(barColor === "sema0" && {
      backgroundColor: theme.colors.atmo4,
    }),
  })
);

export const StyledIcon = styled("div")({
  top: `calc(${theme.card.iconMargin} + ${theme.spacing(1)})`,
  right: `calc(${theme.card.iconMargin} + ${theme.spacing(1)})`,
});
