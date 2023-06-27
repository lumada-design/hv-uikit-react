// build warning is expected:
// Skipping packages/core/src/Snackbar/stories/SnackbarProvider.stories.js: NoMetaError: CSF: missing default export
// this .stories.js file is only intended to be parsed for retrieving the stories' source code,
// but they are rendered by the SnackbarProvider.stories.mdx file

import {
  HvButton,
  HvSnackbarProps,
  HvSnackbarProvider,
  useHvSnackbar,
} from "@core/components";
import { Meta } from "@storybook/react";

export default {
  component: HvSnackbarProvider,
} satisfies Meta<typeof HvSnackbarProvider>;

const Button = ({ onClick, variant }) => (
  <HvButton
    onClick={onClick}
    // variant="contained"
    color="primary"
    style={{ width: "150px", textTransform: "capitalize" }}
  >
    {variant}
  </HvButton>
);

export const SnackbarWithAction = ({ label, variant }: HvSnackbarProps) => {
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

export const Snackbar = ({ label, variant }: HvSnackbarProps) => {
  const { enqueueSnackbar } = useHvSnackbar();

  const handleOpen = () => {
    enqueueSnackbar(label, { variant });
  };

  return <Button onClick={handleOpen} variant={variant} />;
};

export const SnackbarProvider = () => (
  <HvSnackbarProvider autoHideDuration={5000000}>
    <SnackbarWithAction
      variant="default"
      showIcon
      label="This is a snackbar."
    />
    <br />
    <br />
    <Snackbar variant="success" showIcon label="This is a success message." />
    <br />
    <br />
    <Snackbar variant="warning" showIcon label="This is a warning message." />
    <br />
    <br />
    <Snackbar variant="error" label="This is an error message." />
  </HvSnackbarProvider>
);

SnackbarProvider.parameters = {
  eyes: { include: false },
};
