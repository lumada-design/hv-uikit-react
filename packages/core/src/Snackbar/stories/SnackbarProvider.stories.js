/* eslint-disable storybook/default-exports, no-nested-ternary, import/prefer-default-export */

// build warning is expected:
// Skipping packages/core/src/Snackbar/stories/SnackbarProvider.stories.js: NoMetaError: CSF: missing default export
// this .stories.js file is only intended to be parsed for retrieving the stories' source code,
// but they are rendered by the SnackbarProvider.stories.mdx file

import React from "react";

import { HvButton, HvSnackbarProvider, useHvSnackbar } from "../..";

const Button = ({ onClick, variant }) => (
  <HvButton
    onClick={onClick}
    variant="contained"
    color="primary"
    style={{ width: "150px", textTransform: "capitalize" }}
  >
    {variant}
  </HvButton>
);

const SnackbarWithAction = ({ label, variant }) => {
  const { enqueueSnackbar } = useHvSnackbar();

  const handleOpen = () => {
    enqueueSnackbar(label, {
      variant,
      persist: true,
      snackbarContentProps: {
        action: { id: "action", label: "Action", disabled: false },
        actionCallback: () => {
          console.log("Snackbar action");
        },
      },
    });
  };

  return <Button onClick={handleOpen} variant={variant} />;
};

const Snackbar = ({ label, variant }) => {
  const { enqueueSnackbar } = useHvSnackbar();

  const handleOpen = () => {
    enqueueSnackbar(label, { variant });
  };

  return <Button onClick={handleOpen} variant={variant} />;
};

export const SnackbarProvider = () => (
  <HvSnackbarProvider>
    <SnackbarWithAction variant="default" showIcon label="This is a snackbar." />
    <p />
    <Snackbar variant="success" showIcon label="This is a success message." />
    <p />
    <Snackbar variant="error" showIcon label="This is an error message." />
  </HvSnackbarProvider>
);

SnackbarProvider.parameters = {
  eyes: { include: false },
};
