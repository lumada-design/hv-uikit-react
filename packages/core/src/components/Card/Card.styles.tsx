import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBox } from "components";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

export const StyledRoot = styled(
  HvBox,
  transientOptions
)(({ $selectable, $selected }) => ({
  overflow: "visible",
  position: "relative",
  "&.focus-visible": {
    ...outlineStyles,
  },
  "&:focus": {
    outline: "none",
  },
  ...($selectable && {
    "&:hover": {
      outline: `1px solid ${theme.colors.atmo4}`,
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
    "& .semanticBar": {
      height: 4,
    },
    "& .sema0": {
      backgroundColor: theme.colors.acce1,
    },
  }),
}));

const getColor = (c: string): string => theme.colors[c];

export const StyledContainer = styled("div")(
  ({ bgColor }: { bgColor: string }) => ({
    position: "relative",
    backgroundColor: getColor(bgColor),
    "& > *": {
      position: "relative",
      zIndex: 1,
    },
  })
);

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
  top: 0,
  right: 0,
  transform: "translate(50%, -50%)",
});
