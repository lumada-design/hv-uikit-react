import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import NavIcon from "@hv/uikit-react-icons/dist/DropLeftXS";
import Typography from "../../Typography";
import styles from "./styles";

const onKeyDownHandler = (event, onClick) => {
  if (isKeypress(event, KeyboardCodes.Enter)) {
    onClick();
  }
};

const Title = ({ title, classes, onClick }) => (
  <div
    role="button"
    className={classes.titleContainer}
    onClick={onClick}
    tabIndex={0}
    onKeyDown={e => onKeyDownHandler(e, onClick)}
  >
    <div className={classes.navIcon}>
      <NavIcon iconSize="XS" className={classes.box} />
    </div>
    <Typography className={classes.typography} variant="highlightText">
      {title}
    </Typography>
  </div>
);

Title.propTypes = {
  /**
   * Styles applied to the element.
   */
  classes: PropTypes.PropTypes.shape({
    titleContainer: PropTypes.string,
    navIcon: PropTypes.string,
    typography: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Title.defaultProps = {};

export default withStyles(styles, { name: "HvTitle" })(Title);
