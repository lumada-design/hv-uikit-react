import { css } from "@emotion/css";
import {
  HvButton,
  HvButtonProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Code } from "@hitachivantara/uikit-react-icons";

const classes = {
  headerRoot: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderBottom: "none",
    background: theme.colors.atmo1,
    padding: theme.spacing("xs", "sm"),
    gap: theme.space.xs,
  }),
};

export const Header = ({
  onFormat,
}: {
  onFormat: HvButtonProps["onClick"];
}) => (
  <div className={classes.headerRoot}>
    <HvTypography variant="label">SQL</HvTypography>
    <Code />
    <div style={{ flex: 1 }} />
    <HvButton variant="primaryGhost" onClick={onFormat}>
      Format
    </HvButton>
  </div>
);
