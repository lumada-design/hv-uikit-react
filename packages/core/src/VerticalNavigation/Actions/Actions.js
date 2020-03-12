import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../../useUniqueId";
import styles from "./styles";

const Actions = ({ theme, classes, id, children, ...others }) => {
  const internalId = useUniqueId(id, "hv-verticalnavigation-actions-");

  return (
    <div id={internalId} className={classes.root} {...others}>
      {children}
    </div>
  );
};

Actions.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the actions container.
   */
  id: PropTypes.string,
  /**
   * Node to be rendered
   */
  children: PropTypes.node
};

Actions.defaultProps = {
  theme: undefined,
  id: undefined,
  children: undefined
};

export default withStyles(styles, { name: "HvVerticalNavigationActions" })(Actions);
