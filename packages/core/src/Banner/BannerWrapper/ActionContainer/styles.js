import { fade, hexToRgb } from "@material-ui/core";

const styles = theme => ({
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between"
  },
  actionsInnerContainer: {
    flexDirection: "row",
    marginTop: "8px" // avoid overlap with close button outline focus ring
  },
  closeAction: {
    alignSelf: "flex-end",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: fade(hexToRgb(theme.hv.palette.base.base1), 0.3)
    }
  },
  iconContainer: {
    width: "32px",
    height: "32px"
  }
});

export default styles;
