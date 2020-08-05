import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Edit, Close } from "@hv/uikit-react-icons/dist";
import { HvPanel, HvButton } from "../..";

export default {
  title: "Components/Panel",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvPanel } from '@hv/uikit-react-core/dist'"
  },
  component: HvPanel
};

export const Main = () => <HvPanel>Panel Content</HvPanel>;

export const WithScroll = () => {
  const theme = useTheme();

  return (
    <HvPanel width="400px" height="400px">
      <div style={{ height: 600, backgroundColor: theme.hv.palette.atmosphere.atmo4 }}>&nbsp;</div>
    </HvPanel>
  );
};

export const FullWidth = () => {
  const useStyles = makeStyles(theme => ({
    editButton: {
      position: "absolute",
      top: theme.hv.spacing.sm,
      right: theme.hv.spacing.sm
    }
  }));

  const classes = useStyles();

  return (
    <HvPanel width="100%" height="200px">
      <div>Panel Content</div>
      <HvButton category="icon" className={classes.editButton}>
        <Edit />
      </HvButton>
    </HvPanel>
  );
};

export const Modal = () => {
  const useStyles = makeStyles(theme => ({
    closeButton: {
      position: "absolute",
      top: theme.hv.spacing.sm,
      right: theme.hv.spacing.sm
    },
    overlay: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      opacity: 0.8,
      width: "100%",
      padding: theme.hv.spacing.md
    }
  }));

  const theme = useTheme();

  const classes = useStyles();

  return (
    <div className={classes.overlay}>
      <HvPanel width="100%" height="200px" boxShadow={theme.hv.shadows[1]}>
        <div>Panel Content</div>
        <HvButton category="icon" className={classes.closeButton}>
          <Close />
        </HvButton>
      </HvPanel>
    </div>
  );
};
