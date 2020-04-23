import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

class GridViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { elements, classes } = this.props;
    return (
      <div className={classes.root} ref={this.containerRef}>
        <div className={classes.elements}>{elements(this.containerRef)}</div>
      </div>
    );
  }
}

GridViewContainer.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles to the elements container;
     */
    elements: PropTypes.string
  }).isRequired,
  /**
   * A function that returns a renderizable element and receives view container reference.
   */
  elements: PropTypes.func
};

export default withStyles(styles, { name: "HvGridViewContainer" })(GridViewContainer);
