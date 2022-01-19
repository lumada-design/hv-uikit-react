import React from "react";
import { useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { HvButton, HvPanel } from "@hitachivantara/uikit-react-core";
import { Level0Good, Level1 } from "@hitachivantara/uikit-react-icons";

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "0 10px 5px 0",
    },
  },
});

const ThemePreviewMix = () => {
  const theme = useTheme();

  const classes = useStyles();

  return (
    <HvPanel
      boxShadow={theme.hv.shadows[1]}
      margin="10px"
      display="inline-flex"
      className={classes.root}
    >
      <HvButton category="primary">Primary</HvButton>
      <HvButton category="secondary">Secondary</HvButton>
      <HvButton category="ghost">Ghost</HvButton>
      <Level0Good semantic="sema1" />
      <Level1 semantic="sema2" />
      <Level1 semantic="sema3" />
      <Level1 semantic="sema15" />
    </HvPanel>
  );
};

export default ThemePreviewMix;
