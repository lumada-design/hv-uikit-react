import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography, HvListContainer } from "components";
import { CSSProperties } from "react";
import { transientOptions } from "utils/transientOptions";

export const StyledRoot = styled(
  "div",
  transientOptions
)(
  ({
    $open,
    $closed,
    $layout,
  }: {
    $open: boolean;
    $closed: boolean;
    $layout: string;
  }) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    overflow: "hidden",
    // we need to play with the 4px because of the focus ring
    // padding: `${theme.spacing(2) - 4}px 0 ${theme.spacing(2) - 4}px ${
    //   theme.spacing(2) - 4
    // }px`,
    padding: `${theme.space.sm} 0 ${theme.space.sm} ${theme.space.sm}`,

    ...($open && {
      zIndex: "1200",
      position: "absolute",
      top: "50px",
      overflowX: "hidden",
      boxShadow: theme.colors.shadow,
    }),
    ...($closed && {
      display: "none",
    }),
    ...($layout === "single" && { width: 320 }),
    ...($layout === "dual" && { width: 640 }),
  })
);

export const StyledTitle = styled("div")({
  minHeight: 36,

  // we need to play with the 4px because of the focus ring
  // padding: `4px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm - 4}px 4px`,
  padding: `4px ${theme.space.sm} ${theme.space.sm} 4px`,

  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const StyledTitleWithTooltip = styled(
  HvTypography,
  transientOptions
)(({ $type }: { $type: string }) => ({
  ...($type === "appSwitcher" && {
    minHeight: 36,

    // we need to play with the 4px because of the focus ring
    // padding: `4px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm - 4}px 4px`,
    padding: `4px ${theme.space.sm} ${theme.space.sm} 4px`,

    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }),
  ...($type === "action" && {
    flexGrow: 1,
    margin: `0 ${theme.space.xs}`,

    textAlign: "left",

    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",

    color: "inherit",
  }),
}));

export const StyledActionsContainer = styled(HvListContainer)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",

  overflowY: "auto",

  // we need to play with the 4px because of the focus ring
  padding: "4px 0 4px 4px",
});

export const StyledFooter = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: "auto",
  height: 52,

  // we need to play with the 4px because of the focus ring
  // padding: `${theme.hv.spacing.sm - 4}px ${theme.hv.spacing.sm + 4}px 4px 4px`,
  padding: `${theme.space.sm} ${theme.space.sm} 4px 4px`,

  ...(theme.typography.label as CSSProperties),
});
