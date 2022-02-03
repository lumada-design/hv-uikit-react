/* eslint-disable storybook/default-exports, no-nested-ternary, import/prefer-default-export */

// build warning is expected:
// Skipping packages/core/src/Snackbar/stories/SnackbarProvider.stories.js: NoMetaError: CSF: missing default export
// this .stories.js file is only intended to be parsed for retrieving the stories' source code,
// but they are rendered by the SnackbarProvider.stories.mdx file

import React from "react";

import { HvButton, HvSnackbarProvider, useHvSnackbar } from "../..";

export const SnackbarProvider = () => {
  const SimpleSnackbarSpawner = ({ variant, label }) => {
    const { enqueueSnackbar } = useHvSnackbar();
    const handleOpen = () => {
      enqueueSnackbar(label, { variant });
    };
    return (
      <HvButton
        onClick={handleOpen}
        variant="contained"
        color="primary"
        style={{ width: "150px", textTransform: "capitalize" }}
      >
        {variant}
      </HvButton>
    );
  };

  return (
    <HvSnackbarProvider>
      <SimpleSnackbarSpawner variant="default" showIcon label="This is a snackbar." />
      <p />
      <SimpleSnackbarSpawner variant="success" showIcon label="This is a success message." />
      <p />
      <SimpleSnackbarSpawner variant="error" showIcon label="This is an error message." />
    </HvSnackbarProvider>
  );
};

SnackbarProvider.parameters = {
  eyes: { include: false },
};
