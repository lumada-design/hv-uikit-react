import React from "react";
import PropTypes from "prop-types";
import withStyles from "../../styles/withStyles";
import HvTypography from "../../Typography";
import useUniqueId from "../../useUniqueId";
import styles from "./styles";

const Brand = ({ classes, id, logo, name }) => {
  const uniqueId = useUniqueId(id, "hv-brand-");

  return (
    <div id={uniqueId} className={classes.root}>
      {logo}
      {logo && name && <div className={classes.separator} />}
      {name && <HvTypography variant="highlightText">{name}</HvTypography>}
    </div>
  );
};

Brand.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the separator component class.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The brand image node.
   */
  logo: PropTypes.node,
  /**
   * The brand name string.
   */
  name: PropTypes.string
};

Brand.defaultProps = {
  id: undefined,
  logo: null,
  name: null
};

export default withStyles(styles, { name: "HvHeaderBrand" })(Brand);
