import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";
import { transientOptions } from "@core/utils/transientOptions";

const labelBaseStyle: CSSProperties = {
  ...theme.typography.label,
  padding: "0 5px",
  color: theme.colors.atmo1,
  lineHeight: "16px",
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
      backgroundColor: theme.colors.secondary,
      float: "left",
      minHeight: "8px",
      minWidth: "8px",
    }),
    ...($showCount && {
      ...(labelBaseStyle as CSSProperties),
      wordBreak: "keep-all",
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
