import React from "react";
import { makeStyles } from "@material-ui/core";
import { HvButton, HvCheckBox } from "@hitachivantara/uikit-react-core";

const SpacingUsage = () => {
  const useStyles = makeStyles((theme) => ({
    primary: {},
    secondary: {},
    buttonContainer: {
      "& $primary": {
        marginRight: theme.hvSpacing("xs"),
        marginBottom: theme.hvSpacing("md"),
      },
      "& $secondary": {
        margin: theme.hvSpacing(0, "xs", "md", 0),
      },
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <HvButton className={classes.primary} category="primary">
        Test 1
      </HvButton>
      <HvButton className={classes.secondary} category="secondary">
        Test 2
      </HvButton>
      <HvButton className={classes.secondary} category="secondary">
        Test 3
      </HvButton>
    </div>
  );
};

export default SpacingUsage;
