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
import MuiDialogContent from "@material-ui/core/DialogContent";
import classNames from "classnames";
import HvTypography from "../../Typography";

/**
 * Message container. The passed children is render in this container, creating
 * a typography node if the children is of the string type.
 *
 * @param classes
 * @param children
 * @returns {*}
 * @constructor
 */
const ModalContent = ({ classes, children }) => {
  const isString = typeof children === "string";

  return (
    <MuiDialogContent
      className={classNames(classes.root, {
        [classes.textContent]: isString
      })}
    >
      {!isString && children}
      {isString && <HvTypography variant="normalText">{children}</HvTypography>}
    </MuiDialogContent>
  );
};
ModalContent.propTypes = {
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

export default ModalContent;
