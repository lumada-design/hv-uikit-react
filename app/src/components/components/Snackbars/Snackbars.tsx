import { HvSnackbar } from "@hitachivantara/uikit-react-core";

export const Snackbars = () => {
  return (
    <>
      <HvSnackbar
        open={true}
        variant={"default"}
        label={"This is the default snackbar"}
        transitionDirection={"left"}
        showIcon={true}
        offset={60}
        transitionDuration={300}
        autoHideDuration={5000}
      />
      <HvSnackbar
        open={true}
        variant={"success"}
        label={"This is a success snackbar"}
        transitionDirection={"left"}
        showIcon={true}
        offset={120}
        transitionDuration={300}
        autoHideDuration={5000}
      />
      <HvSnackbar
        open={true}
        variant={"error"}
        label={"And this is an error snackbar"}
        transitionDirection={"left"}
        showIcon={true}
        offset={180}
        transitionDuration={300}
        autoHideDuration={5000}
      />
    </>
  );
};
