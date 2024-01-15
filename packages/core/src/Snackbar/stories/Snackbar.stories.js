import React, { useState } from "react";
import { Info } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvSnackbar, HvSnackbarContent, HvTypography } from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Notification/Snackbar",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSnackbar } from "@hitachivantara/uikit-react-core";',
  },
  component: HvSnackbar,
};

const styles = {
  position: "relative",
  top: 0,
  marginBottom: 10,
};

export const Main = () => (
  <>
    <HvSnackbar open variant="default" style={styles} label="This is a default snackbar." />
    <HvSnackbar open variant="success" style={styles} showIcon label="This is a success message." />
    <HvSnackbar open variant="error" style={styles} showIcon label="This is an error message." />
    <HvSnackbar
      open
      style={styles}
      label="This is a snackbar with action."
      action={{ id: "get", label: "Action" }}
      actionCallback={(id, action) => console.log(`Clicked ${action.label}`)}
    />
  </>
);

export const SnackbarController = () => {
  const SimpleSnackbar = ({ variant, ...others }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = (event, reason) => {
      if (reason === "clickaway") return;
      setOpen(false);
    };

    return (
      <>
        <HvButton
          onClick={handleOpen}
          variant="contained"
          color="primary"
          style={{ width: "150px", textTransform: "capitalize" }}
        >
          {variant}
        </HvButton>
        <HvSnackbar open={open} onClose={handleClose} offset={0} variant={variant} {...others} />
      </>
    );
  };

  return (
    <>
      <SimpleSnackbar variant="default" showIcon label="This is a snackbar." />
      <p />
      <SimpleSnackbar variant="success" showIcon label="This is a success message." />
      <p />
      <SimpleSnackbar variant="error" showIcon label="This is an error message." />
    </>
  );
};

SnackbarController.story = {
  parameters: {
    docs: {
      storyDescription: "Different Snackbar variants with controller",
    },
  },
};

export const CustomIcon = () => (
  <div style={{ height: 100 }}>
    <HvSnackbar
      open
      offset={0}
      id="snackbar2"
      label="This is a snackbar with a custom icon."
      customIcon={<Info color="base2" />}
    />
  </div>
);

CustomIcon.story = {
  parameters: {
    docs: {
      storyDescription: "Snackbar with custom icon",
    },
  },
};

export const CustomAction = () => (
  <div style={{ height: 100 }}>
    <HvSnackbar
      open
      id="actionStructure"
      offset={0}
      label="This is a snackbar."
      showIcon
      action={{ id: "post", label: "Action", disabled: false }}
      actionCallback={(id, action) => alert(`clicked ${id} with ${action.label}`)}
    />
  </div>
);

CustomAction.story = {
  parameters: {
    docs: {
      storyDescription:
        "Snackbar can receive a component or object action that will render a semantic button",
    },
  },
};

export const SnackbarVariations = () => (
  <div>
    <HvTypography variant="xsTitle">Semantics</HvTypography>
    <p />
    <HvSnackbarContent label="This is a snackbar." variant="default" />
    <p />
    <HvSnackbarContent label="This is a success message." variant="success" showIcon />
    <p />
    <HvSnackbarContent label="This is an error message." variant="error" showIcon />
    <p />

    <HvTypography variant="xsTitle">Action</HvTypography>
    <p />
    <HvSnackbarContent
      label="This is a snackbar."
      variant="default"
      action={{ id: "post", label: "Action", disabled: false }}
      actionCallback={(id, action) => alert(`clicked ${action.label}`)}
    />
    <p />

    <HvTypography variant="xsTitle">Custom icon</HvTypography>
    <p />
    <HvSnackbarContent
      variant="default"
      label="This is a snackbar."
      customIcon={<Info color="base2" />}
    />
    <p />
    <HvSnackbarContent
      variant="success"
      label="This is a success message."
      customIcon={<Info color="base2" />}
    />
    <p />
    <HvSnackbarContent
      variant="error"
      label="This is an error message."
      customIcon={<Info color="base2" />}
    />
  </div>
);
