import React from "react";
import { makeStyles } from "@material-ui/core";
import { HvActionContainer, HvButton, HvDropDownMenu } from "../..";

export default {
  title: "Patterns/Action Bar/Action Container",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvActionContainer } from '@hv/uikit-react-core/dist'"
  },
  component: HvActionContainer
};

export const Main = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      margin: "auto",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      width: "1000px"
    },
    flexBox: {
      display: "flex"
    },
    separator: {
      marginRight: theme.hv.spacing.sm
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HvActionContainer id="ActionContainer">
        <div className={classes.flexBox}>
          <div className={classes.separator}>
            <HvButton category="ghost" onClick={() => console.log("Save action")}>
              Save
            </HvButton>
          </div>
          <div>
            <HvButton category="ghost" onClick={() => console.log("Cancel action")}>
              Cancel
            </HvButton>
          </div>
        </div>
        <div>
          <HvButton category="ghost" onClick={() => console.log("Help action")}>
            Help
          </HvButton>
        </div>
      </HvActionContainer>
    </div>
  );
};

export const DualAction = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      margin: "auto",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      width: "1000px"
    },
    flexBox: {
      display: "flex"
    },
    separator: {
      marginRight: theme.hv.spacing.sm
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HvActionContainer id="ActionContainer">
        <div className={classes.flexBox}>
          <div className={classes.separator}>
            <HvButton category="ghost" onClick={() => console.log("Save action")}>
              Save
            </HvButton>
          </div>
          <div>
            <HvButton category="ghost" onClick={() => console.log("Cancel action")}>
              Cancel
            </HvButton>
          </div>
        </div>
      </HvActionContainer>
    </div>
  );
};

DualAction.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the action bar pattern with only two actions."
    }
  }
};

export const VariedActionBar = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      margin: "auto",
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      width: "1000px"
    },
    flexBox: {
      display: "flex"
    },
    separator: {
      marginRight: theme.hv.spacing.sm
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HvActionContainer id="ActionContainer">
        <div className={classes.flexBox}>
          <div className={classes.separator}>
            <HvButton category="ghost" onClick={() => console.log("Save action")}>
              Save
            </HvButton>
          </div>
          <div>
            <HvDropDownMenu
              onClick={(e, item) => console.log(item.label)}
              dataList={[{ label: "Delete" }, { label: "Update" }]}
            />
          </div>
        </div>
        <div>
          <HvButton category="ghost" onClick={() => console.log("Help action")}>
            Help
          </HvButton>
        </div>
      </HvActionContainer>
    </div>
  );
};

VariedActionBar.story = {
  parameters: {
    docs: {
      storyDescription: "Showcasing the action bar pattern with only two actions."
    }
  }
};
