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
import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import classNames from "classnames";
import HvTypography from "../../Typography";

import styles from "./styles";

/**
 * Message container. The passed children is render in this container, creating
 * a typography node if the children is of the string type.
 *
 * @param classes
 * @param children
 * @returns {*}
 * @constructor
 */
const ModalContent = ({ classes, className, children }) => {
  const isString = typeof children === "string";

  return (
    <MuiDialogContent
      className={classNames(
        classes.root,
        {
          [classes.textContent]: isString
        },
        className
      )}
    >
      {!isString && children}
      {isString && <HvTypography variant="normalText">{children}</HvTypography>}
    </MuiDialogContent>
  );
};
ModalContent.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component (container for the content).
     */
    root: PropTypes.string,
    /**
     * Style applied when the content is a string.
     */
    textContent: PropTypes.string
  }).isRequired,
  /**
   * Content to be render.
   */
  children: PropTypes.node.isRequired
};

ModalContent.defaultProps = {
  className: ""
};

export default withStyles(styles, { name: "HvModalContent" })(ModalContent);
