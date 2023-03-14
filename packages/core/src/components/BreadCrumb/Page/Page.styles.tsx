import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvLink, HvTypography } from "components";

export const StyledLink = styled((props) => <HvLink {...props} />)({
  padding: `8px ${theme.space.xs}`,
  textDecoration: "none",
  borderRadius: theme.radii.base,
  "&:hover": {
    backgroundColor: theme.colors.atmo3,
  },
  "&:focus": {
    backgroundColor: theme.colors.atmo3,
  },
});

export const StyledTypography = styled((props) => <HvTypography {...props} />)({
  maxWidth: "170px",
  color: theme.colors.acce1,
  textTransform: "capitalize",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.colors.atmo3,
  },
});
