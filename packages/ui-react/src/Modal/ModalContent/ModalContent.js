/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import MuiDialogContent from "@material-ui/core/DialogContent";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";

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
      {isString && <Typography variant="body1">{children}</Typography>}
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
    root: PropTypes.instanceOf(Object),
    /**
     * Style applied when the content is a string.
     */
    textContent: PropTypes.instanceOf(Object)
  }).isRequired,
  /**
   * Content to be render.
   */
  children: PropTypes.node.isRequired
};

export default ModalContent;
