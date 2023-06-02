import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "@core/components";
import { outlineStyles } from "@core/utils";

export const StyledRoot = styled("div")({
  marginTop: theme.spacing("xs"),
  backgroundColor: theme.colors.atmo1,
  borderBottom: theme.calendar.headerInputBorderBottom,
  borderTop: theme.calendar.headerInputBorderTop,
  borderLeft: theme.calendar.headerInputBorderLeft,
  borderRight: theme.calendar.headerInputBorderRight,
  borderRadius: theme.calendar.borderRadius,
  "&:hover, &:focus": {
    borderBottom: `1px solid ${theme.colors.secondary}`,
  },
});

export const StyledInputBorderContainer = styled("div")({
  backgroundColor: theme.colors.negative,
  height: 1,
  marginTop: -1,
});

export const StyledInput = styled((props) => <input {...props} />)({
  border: "none",
  backgroundColor: "transparent",
  padding: `5px ${theme.spacing("xs")}`,
  fontFamily: theme.fontFamily.body,

  color: theme.calendar.headerInputFontColor,
  fontSize: theme.calendar.headerInputFontSize,
  letterSpacing: theme.calendar.headerInputFontLetterSpacing,
  lineHeight: theme.calendar.headerInputFontLineHeight,
  fontWeight: theme.calendar.headerInputFontWeight,
  width: "100%",
  "&::placeholder": {
    color: theme.colors.secondary_60,
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    ...outlineStyles,
  },
});

export const StyledHeaderDayOfWeek = styled(HvTypography)({
  color: theme.calendar.headerInputFontColor,
  paddingLeft: theme.spacing("xs"),
});

export const StyledTypography = styled(HvTypography)({
  display: "flex",
  alignItems: "center",
  color: theme.colors.negative,
});
