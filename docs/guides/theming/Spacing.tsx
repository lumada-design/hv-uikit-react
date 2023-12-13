import { css } from "@emotion/css";
import { HvButton, theme } from "@hitachivantara/uikit-react-core";

const classes = {
  root: css({
    "& > *": {
      margin: theme.spacing("xs", "6px"),
    },
  }),
};

export const Spacing = () => (
  <div className={classes.root}>
    <HvButton variant="primary">Button 1</HvButton>
    <HvButton variant="primarySubtle">Button 2</HvButton>
    <HvButton variant="primaryGhost">Button 3</HvButton>
  </div>
);
