import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Edit, Close } from "@hitachivantara/uikit-react-icons";
import { HvPanel, HvButton, HvTypography } from "../..";

export default {
  title: "Components/Panel",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvPanel } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvPanel,
};

export const Main = () => (
  <HvPanel>
    <HvTypography>Panel Content</HvTypography>
  </HvPanel>
);

export const WithScroll = () => {
  const theme = useTheme();

  return (
    <HvPanel width="400px" height="400px">
      <div style={{ height: 600, backgroundColor: theme.hv.palette.atmosphere.atmo4 }}>&nbsp;</div>
    </HvPanel>
  );
};

export const FullWidth = () => {
  const useStyles = makeStyles((theme) => ({
    editButton: {
      position: "absolute",
      top: theme.hv.spacing.sm,
      right: theme.hv.spacing.sm,
      width: "32px",
      height: "32px",
    },
  }));

  const classes = useStyles();

  return (
    <HvPanel width="100%" height="200px">
      <HvTypography>Panel Content</HvTypography>
      <HvButton icon className={classes.editButton} aria-label="Edit">
        <Edit />
      </HvButton>
    </HvPanel>
  );
};

export const Modal = () => {
  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: "absolute",
      top: theme.hv.spacing.sm,
      right: theme.hv.spacing.sm,
      width: "32px",
      height: "32px",
    },
    overlay: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      opacity: 0.8,
      width: "100%",
      padding: theme.hv.spacing.md,
    },
  }));

  const theme = useTheme();

  const classes = useStyles();

  return (
    <div className={classes.overlay}>
      <HvPanel width="100%" height="200px" boxShadow={theme.hv.shadows[1]}>
        <HvTypography>Panel Content</HvTypography>
        <HvButton icon className={classes.closeButton} aria-label="Close">
          <Close />
        </HvButton>
      </HvPanel>
    </div>
  );
};
