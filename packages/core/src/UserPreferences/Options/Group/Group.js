import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import Typography from "../../../Typography";
import withId from "../../../withId";
import { setId } from "../../../utils";
import styles from "./styles";

const Group = ({ id, className, classes, label, children, labelProps, ...others }) => {
  const labelId = setId(id, "grouplabel");

  return (
    <nav
      id={id}
      className={clsx(className, classes.root)}
      aria-labelledby={label ? labelId : undefined}
      {...others}
    >
      {label && (
        <Typography
          component="div"
          id={labelId}
          variant="highlightText"
          className={classes.label}
          {...labelProps}
        >
          {label}
        </Typography>
      )}
      <ul className={classes.ul}>{children}</ul>
    </nav>
  );
};

Group.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the ul component.
     */
    ul: PropTypes.string,
  }).isRequired,
  /**
   * Label for the group.
   */
  label: PropTypes.string,
  /**
   * Props applied to the generated label.
   */
  labelProps: PropTypes.instanceOf(Object),
  /**
   * Children component.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvUserPreferencesGroup" })(withId(Group));
