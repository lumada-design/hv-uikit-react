import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      position: "absolute",
      left: "50%",
      top: "54px",
      transform: "translate(-50%,0)",
      transition: "all .3s ease",
      zIndex: 1,
      pointerEvents: "none",
    },
    default: {
      padding: "32px",
    },
    noTextMessage: {
      lineHeight: "32px",
    },
  })
);

export default useStyles;
