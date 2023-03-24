import { HvSnackbar } from "@hitachivantara/uikit-react-core";

export const Snackbars = () => {
  return (
    <>
      <HvSnackbar
        open={true}
        variant={"success"}
        label={"This is a success snackbar"}
        transitionDirection={"left"}
        showIcon={true}
        offset={120}
        transitionDuration={300}
        autoHideDuration={5000}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
        }}
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
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
        }}
      />
      <HvSnackbar
        action={{
          disabled: false,
          id: "post",
          label: "Action",
        }}
        actionCallback={() => {}}
        id="actionStructure"
        label="This is a snackbar."
        offset={0}
        open
        showIcon
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
        }}
      />
    </>
  );
};
