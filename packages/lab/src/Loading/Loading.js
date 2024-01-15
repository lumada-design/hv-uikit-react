import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { withStyles } from "@material-ui/core";
import { HvTypography, withDeprecated } from "@hitachivantara/uikit-react-core";
import styles from "./styles";

/**
 * A Loading Component component, still in development.
 */
const Loading = ({ classes, size, position, text }) => {
  return (
    <div
      className={clsx(classes.loading, {
        [classes.centerPosition]: position === "center",
        [classes.inlinePosition]: position === "inline",
      })}
    >
      <div>
        <div className={clsx(classes.loadingBar, size)} />
        <div className={clsx(classes.loadingBar, size)} />
        <div className={clsx(classes.loadingBar, size)} />
      </div>
      {!isEmpty(text) ? (
        <div className={classes.loadingText}>
          <HvTypography variant="normalText">{text}</HvTypography>
        </div>
      ) : null}
    </div>
  );
};

Loading.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    loadingBar: PropTypes.string,
    loadingText: PropTypes.string,
    loading: PropTypes.string,
    centerPosition: PropTypes.string,
    inlinePosition: PropTypes.string,
  }).isRequired,
  /**
   * The size of the loading indicator.
   */
  size: PropTypes.oneOf(["regular", "small"]),
  /**
   * The position where the loading indicator is to be positioned in,
   * center of the page or inline in the container where its inserted.
   */
  position: PropTypes.oneOf(["center", "inline"]),
  /**
   * The text to be displayed.
   */
  text: PropTypes.string,
};

Loading.defaultProps = {
  size: "regular",
  position: "center",
  text: "",
};

export default withDeprecated(
  withStyles(styles, { name: "HvLoading" })(Loading),
  "Please use the Loading component in the Core Package"
);
