import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

interface StyledBadgeProps {
  badge?: boolean;
  showCount?: boolean;
  showLabel?: boolean;
  badgeIcon?: boolean;
  badgeOneDigit?: boolean;
}

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

export const StyledContainer = styled("div")(
  ({ component }: { component: boolean }) => ({
    ...(component && {
      width: 0,
      backgroundColor: "red",
    }),
  })
);

export const StyledBadge = styled("div")(
  ({
    badge,
    showCount,
    showLabel,
    badgeIcon,
    badgeOneDigit,
  }: StyledBadgeProps) => ({
    ...(badge && {
      borderRadius: theme.spacing(1),
      backgroundColor: theme.colors.acce1,
      float: "left",
      minHeight: "8px",
      minWidth: "8px",
    }),
    ...(showCount && {
      ...labelBaseStyle,
      wordBreak: "keep-all",
      maxWidth: 30,
    }),
    ...(showLabel && {
      ...labelBaseStyle,
      wordBreak: "keep-all",
    }),
    ...(badgeIcon && {
      position: "relative",
      top: "1px",
      left: "-7px",
    }),
    ...(badgeOneDigit && {
      padding: 0,
      width: "16px",
      textAlign: "center",
    }),
  })
);
