import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@mui/styles";

import { html, body } from "./CssBaseline";

const useStyles = makeStyles((theme) => ({
  /* Styles applied to the root element. */
  root: {
    ...html,
    ...body(theme),
    "& *, & *::before, & *::after": {
      boxSizing: "inherit",
    },
    "& strong, & b": {
      fontWeight: theme.hv.typography.highlightText.fontWeight,
    },
  },
}));

const ScopedCssBaseline = React.forwardRef(function ScopedCssBaseline(props, ref) {
  const { component: RootComponent = "div", className, children, ...other } = props;

  const classes = useStyles();

  return (
    <RootComponent className={clsx(classes.root, className)} ref={ref} {...other}>
      {children}
    </RootComponent>
  );
});

ScopedCssBaseline.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * Defaults to `div`.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default ScopedCssBaseline;
