import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      padding: `0 ${theme.hv.spacing.sm}px`,
      height: 40,
      bottom: 0,
      zIndex: theme.zIndex.appBar,
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      boxShadow: `0 -1px 0 ${theme.hv.palette.atmosphere.atmo4}`,
      [theme.breakpoints.down("sm")]: {
        height: "unset",
        flexDirection: "column",
        padding: theme.hv.spacing.sm,
      },
    },
    name: {
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.hv.spacing.xs,
      },
    },
    rightContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      marginLeft: "auto",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        textAlign: "center",
        marginLeft: "unset",
      },
    },
    copyright: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginBottom: theme.hv.spacing.xs,
      },
    },
    separator: {
      width: 1,
      height: 16,
      backgroundColor: theme.hv.palette.accent.acce1,
      margin: `0 ${theme.hv.spacing.xs}px`,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    links: {},
  });
