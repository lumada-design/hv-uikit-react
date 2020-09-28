const styles = (theme) => ({
  root: {
    height: "100%",
    minWidth: 250,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "30px 0px 0px 0px",
  },
  title: {
    display: "flex",
    position: "relative",
    width: "100%",
    zIndex: 1,
    marginTop: "100px",
    justifyContent: "center",
  },
  instructions: {
    position: "relative",
    margin: "0px",
    textAlign: "center",
    fontFamily: theme.hv.typography.fontFamily,
  },
  input: {
    position: "relative",
    paddingTop: "126px",
  },
  cancelButton: {
    position: "relative",
    width: "120px",
  },
  submitButton: {
    position: "relative",
    width: "120px",
    float: "right",
  },
  buttonsContainer: {
    position: "relative",
    display: "inherit",
    alignItems: "center",
    marginTop: "52px",
  },
  buttonsContainerError: {
    position: "relative",
    display: "inherit",
    alignItems: "center",
    marginTop: "28px",
  },
  showOkMessage: {
    backgroundColor: theme.hv.palette.semantic.sema8,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingRight: `${theme.hv.spacing.xs}px`,
  },
  iconError: {
    margin: `0 ${theme.hv.spacing.xs}px`,
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px",
  },
  messageContainer: {
    top: "15px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "52px",
  },
});

export default styles;
