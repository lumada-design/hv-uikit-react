import React from "react";
import { useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { HvButton, HvPanel } from "@hitachivantara/uikit-react-core";
import { Level0Good, Level1 } from "@hitachivantara/uikit-react-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",

    margin: 10,
    padding: theme.hv.spacing.sm,

    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: theme.hv.shadows[1],

    "& > *": {
      margin: "0 10px 5px 0",
    },
  },
}));

const ThemePreviewMix = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HvButton category="primary">Primary</HvButton>
      <HvButton category="secondary">Secondary</HvButton>
      <HvButton category="ghost">Ghost</HvButton>
      <Level0Good semantic="sema1" />
      <Level1 semantic="sema2" />
      <Level1 semantic="sema3" />
      <Level1 semantic="sema15" />
    </div>
  );
};

export default ThemePreviewMix;
