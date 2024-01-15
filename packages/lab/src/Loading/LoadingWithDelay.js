import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withDeprecated } from "@hitachivantara/uikit-react-core";
import Loading from "./Loading";
import styles from "./styles";

const LoadingWithDelay = ({ delay = 0, ...loadingProps }) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldDisplay(true), delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return shouldDisplay && <Loading {...loadingProps} />;
};

LoadingWithDelay.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * The class applied on the text area input box.
     */
    input: PropTypes.string,
    /**
     * The class applied on the character counter.
     */
    characterCounter: PropTypes.string,
    /**
     * The class controlling the layout of the counter.
     */
    inline: PropTypes.string,
    /**
     * The class applied to the separator element of the character counter.
     */
    separator: PropTypes.string,
    /**
     * The class applied to the max counter element of the character counter.
     */
    maxCharacter: PropTypes.string,
    /**
     * The class applied to the current counter element of the character counter.
     */
    currentCounter: PropTypes.string,
    /**
     * The class applied to the character counter when it is disabled.
     */
    disabled: PropTypes.string,
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
  /**
   * The amount of milliseconds that the component should wait before showing the Loading
   */
  delay: PropTypes.number,
};

export default withDeprecated(
  withStyles(styles, { name: "HvLoadingWithDelay" })(LoadingWithDelay),
  "Please use the Loading component in the Core Package"
);
