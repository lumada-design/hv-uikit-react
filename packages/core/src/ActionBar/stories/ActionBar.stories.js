import React from "react";
import { makeStyles } from "@material-ui/core";
import { HvActionsGeneric, HvActionBar, HvButton, HvDropDownMenu } from "../..";

export default {
  title: "Components/Action Bar",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvActionBar } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvActionBar,
  subcomponents: { HvActionsGeneric },
};

export const Main = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      position: "relative",
      margin: "auto",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      height: "150px",
      width: "400px",
    },
    actionBar: {
      position: "absolute",
      bottom: "0",
    },
    space: {
      flex: 1,
    },
    buttonSeparator: {
      marginRight: theme.hv.spacing.xs,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <HvActionBar className={classes.actionBar}>
        <HvButton category="ghost" onClick={() => console.log("Help action")}>
          Help
        </HvButton>
        <div aria-hidden="true" className={classes.space}>
          &nbsp;
        </div>
        <HvButton
          className={classes.buttonSeparator}
          category="ghost"
          onClick={() => console.log("Save action")}
        >
          Save
        </HvButton>
        <HvButton category="ghost" onClick={() => console.log("Cancel action")}>
          Cancel
        </HvButton>
      </HvActionBar>
    </div>
  );
};

export const DualAction = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      position: "relative",
      margin: "auto",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      height: "150px",
      width: "400px",
    },
    actionBar: {
      position: "absolute",
      bottom: "0",
    },
    space: {
      flex: 1,
    },
    buttonSeparator: {
      marginRight: theme.hv.spacing.xs,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <HvActionBar className={classes.actionBar}>
        <HvButton
          className={classes.buttonSeparator}
          category="ghost"
          onClick={() => console.log("Save action")}
        >
          Save
        </HvButton>
        <HvButton category="ghost" onClick={() => console.log("Cancel action")}>
          Cancel
        </HvButton>
      </HvActionBar>
    </div>
  );
};

DualAction.parameters = {
  docs: {
    description: { story: "Showcasing the action bar pattern with only two actions." },
  },
};

export const VariedActionBar = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      position: "relative",
      margin: "auto",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      height: "150px",
      width: "400px",
    },
    actionBar: {
      position: "absolute",
      bottom: "0",
    },
    space: {
      flex: 1,
    },
    buttonSeparator: {
      marginRight: theme.hv.spacing.xs,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <HvActionBar className={classes.actionBar}>
        <HvButton category="ghost" onClick={() => console.log("Help action")}>
          Help
        </HvButton>
        <div aria-hidden="true" className={classes.space}>
          &nbsp;
        </div>
        <HvButton
          className={classes.buttonSeparator}
          category="ghost"
          onClick={() => console.log("Save action")}
        >
          Save
        </HvButton>
        <HvDropDownMenu
          onClick={(e, item) => console.log(item.label)}
          dataList={[{ label: "Delete" }, { label: "Update" }]}
        />
      </HvActionBar>
    </div>
  );
};

VariedActionBar.parameters = {
  docs: {
    description: { story: "Showcasing the action bar pattern with only two actions." },
  },
};
