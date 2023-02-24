import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";
import { transientOptions } from "utils/transientOptions";

const labelBaseStyle = {
  ...theme.typography.label,
  fontFamily: theme.fontFamily.body,
  padding: "0 5px",
  color: theme.colors.atmo1,
};

export const StyledRoot = styled("div")({
  position: "relative",
  "&>*": { float: "left" },
});

export const StyledContainer = styled(
  "div",
  transientOptions
)(({ $component }: { $component: boolean }) => ({
  ...($component && {
    width: 0,
    backgroundColor: "red",
  }),
}));

export const StyledBadge = styled(
  "div",
  transientOptions
)(
  ({
    $badge,
    $showCount,
    $showLabel,
    $badgeIcon,
    $badgeOneDigit,
  }: {
    $badge?: boolean;
    $showCount?: boolean;
    $showLabel?: boolean;
    $badgeIcon?: boolean;
    $badgeOneDigit?: boolean;
  }) => ({
    ...($badge && {
      borderRadius: theme.space.xs,
      backgroundColor: theme.colors.acce1,
      float: "left",
      minHeight: "8px",
      minWidth: "8px",
    }),
    ...($showCount && {
      ...(labelBaseStyle as CSSProperties),
      wordBreak: "keep-all",
      maxWidth: 30,
    }),
    ...($showLabel && {
      ...(labelBaseStyle as CSSProperties),
      wordBreak: "keep-all",
    }),
    ...($badgeIcon && {
      position: "relative",
      top: "1px",
      left: "-7px",
    }),
    ...($badgeOneDigit && {
      padding: 0,
      width: "16px",
      textAlign: "center",
    }),
  })
);
