import { css } from "@emotion/css";
import {
  HvButton,
  HvOverflowTooltip,
  HvSnackbarProvider,
  useHvSnackbar,
} from "@hitachivantara/uikit-react-core";

const SnackbarButtons = () => {
  const { enqueueSnackbar, closeSnackbar } = useHvSnackbar();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: 150,
      })}
    >
      <HvButton
        variant="secondarySubtle"
        onClick={() => {
          enqueueSnackbar("This is a success snackbar", { variant: "success" });
        }}
      >
        Success
      </HvButton>
      <HvButton
        variant="secondarySubtle"
        onClick={() => {
          enqueueSnackbar("This is a warning snackbar", { variant: "warning" });
        }}
      >
        Warning
      </HvButton>
      <HvButton
        variant="secondarySubtle"
        onClick={() => {
          enqueueSnackbar("This is an error snackbar", { variant: "error" });
        }}
      >
        Error
      </HvButton>
      <HvButton
        variant="secondarySubtle"
        onClick={() => {
          const snackbarId = enqueueSnackbar("This is an action snackbar", {
            variant: "default",
            persist: true,
            snackbarContentProps: {
              action: { id: "action", label: "Dismiss" },
              actionCallback: (evt, id, action) => {
                console.log("Clicked action", action);
                closeSnackbar(snackbarId);
              },
            },
          });
        }}
      >
        Action
      </HvButton>
      <HvButton
        variant="secondarySubtle"
        onClick={() => {
          const snackbarLabel = (
            <HvOverflowTooltip
              paragraphOverflow
              data={`This is a very ${"very ".repeat(26)}long snackbar.`}
            />
          );
          enqueueSnackbar(snackbarLabel, { variant: "default" });
        }}
      >
        Overflow
      </HvButton>
    </div>
  );
};

export const SnackbarProviderButtons = () => (
  <HvSnackbarProvider autoHideDuration={5000000}>
    <SnackbarButtons />
  </HvSnackbarProvider>
);
