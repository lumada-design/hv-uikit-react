/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

import HvTypography from "@hv/uikit-react-core/dist/Typography";

/**
 * A loading component. It can be customized through a series of parameters.
 *
 * @class Loading
 * @extends {React.Component}
 */
const Loading = ({ classes, size, position, text }) => {
  return (
    <div
      className={clsx(classes.loading, {
        [classes.centerPosition]: position === "center",
        [classes.inlinePosition]: position === "inline"
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
    disabled: PropTypes.string
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
  text: PropTypes.string
};

Loading.defaultProps = {
  size: "regular",
  position: "center",
  text: "",
  classes: {}
};

export default withStyles(styles, { name: "HvLoading" })(Loading);
