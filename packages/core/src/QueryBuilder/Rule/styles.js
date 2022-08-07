import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginTop: theme.hv.spacing.xs,

    minHeight: 94,

    "&>div:not(:last-child)": {
      marginRight: theme.hv.spacing.md,

      [theme.breakpoints.down("md")]: {
        marginRight: theme.hv.spacing.md / 2,
      },
    },

    // hide required * as all fields are required
    "& label>span[aria-hidden]": {
      visibility: "hidden",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: 2,

      width: 21,
      height: 39,

      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

      top: 0,
      left: -21,
    },
    ":not(.topRulesContainer)>&:last-child::after": {
      content: '""',
      position: "absolute",
      zIndex: 1,

      width: 21,
      height: "100%",

      borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

      top: 0,
      left: -21,
    },
  },
  actionsContainer: {
    marginLeft: "auto",
    marginTop: 22,

    "&>:not(:last-child)": {
      marginRight: theme.hvSpacing("xs"),
    },
  },
}));

export default useStyles;
