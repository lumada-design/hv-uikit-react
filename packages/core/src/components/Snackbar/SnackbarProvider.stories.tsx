// build warning is expected:
// Skipping packages/core/src/Snackbar/stories/SnackbarProvider.stories.js: NoMetaError: CSF: missing default export
// this .stories.js file is only intended to be parsed for retrieving the stories' source code,
// but they are rendered by the SnackbarProvider.stories.mdx file

import {
  HvButton,
  HvSnackbarProps,
  HvSnackbarProvider,
  useHvSnackbar,
} from "@hitachivantara/uikit-react-core";

const Button = ({ onClick, variant }) => (
  <HvButton
    onClick={onClick}
    variant="secondary"
    style={{ width: "150px", textTransform: "capitalize" }}
  >
    {variant}
  </HvButton>
);

const SnackbarWithAction = ({ label, variant }: HvSnackbarProps) => {
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

const Snackbar = ({ label, variant }: HvSnackbarProps) => {
  const { enqueueSnackbar } = useHvSnackbar();

  const handleOpen = () => {
    enqueueSnackbar(label, { variant });
  };

  return <Button onClick={handleOpen} variant={variant} />;
};

export const SnackbarProvider = () => (
  <HvSnackbarProvider autoHideDuration={5000000}>
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SnackbarWithAction variant="default" label="This is a snackbar." />
      <Snackbar variant="success" label="This is a success message." />
      <Snackbar variant="warning" label="This is a warning message." />
      <Snackbar variant="error" label="This is an error message." />
    </div>
  </HvSnackbarProvider>
);

SnackbarProvider.parameters = {
  eyes: { include: false },
};
