import React from "react";
import PropTypes from "prop-types";
import withStyles from "../../styles/withStyles";
import useUniqueId from "../../useUniqueId";
import styles from "./styles";

const Actions = ({ classes, id, children }) => {
  const uniqueId = useUniqueId(id, "hv-actions-");

  return (
    <div id={uniqueId} className={classes.root}>
      {children}
    </div>
  );
};

Actions.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Node to be rendered.
   */
  children: PropTypes.node
};

Actions.defaultProps = {
  id: undefined,
  children: null
};

export default withStyles(styles, { name: "HvHeaderActions" })(Actions);
