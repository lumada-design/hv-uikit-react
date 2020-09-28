import React from "react";
import { fade, hexToRgb, withStyles } from "@material-ui/core";

export const semanticStyles = (theme) => ({
  color: theme.palette.base2,
  "&:hover:not(:disabled)": {
    backgroundColor: fade(hexToRgb(theme.palette.base1), 0.3),
  },
  "& *": {
    color: theme.palette.base2,
    backgroundColor: "transparent",
  },
});

const styles = (theme) => ({
  root: {
    ...semanticStyles(theme),
  },
});

const withSemantic = (Component, isSemantic = true) => {
  /* eslint-disable react/prop-types */
  const WithSemantic = (props) => {
    const WithStyles = withStyles(styles)(({ classes }) => (
      <Component className={classes.root} {...props} />
    ));

    return <WithStyles />;
  };

  return isSemantic ? WithSemantic : Component;
};

export default withSemantic;
