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
import classNames from "classnames";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";

import Close16 from "@hv-ui/icons/core/S-icons/Close16";
import Button from "../../Button";

const style = {
  width: "32px"
};

/**
 * Modal component.
 *
 * @param classes
 * @param children
 * @param open
 * @param onClose
 * @param others
 * @returns {*}
 * @constructor
 */
const Main = ({ classes, children, open, onClose, ...others }) => (
  <Dialog
    className={classNames(classes.root)}
    open={open}
    PaperProps={{
      classes: {
        root: classes.paper
      }
    }}
    BackdropProps={{
      classes: {
        root: classes.background
      }
    }}
    onClose={(event, reason) => onClose(event, reason)}
    {...others}
  >
    <Button
      className={classes.closeButton}
      colorType="link"
      onClick={event => onClose(event)}
    >
      <Close16 style={style} />
    </Button>
    {children}
  </Dialog>
);

Main.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the background (outside) of the component.
     */
    background: PropTypes.string,
    /**
     * Style applied to the component (root).
     */
    paper: PropTypes.string,
    /**
     * Style applied to the close button.
     */
    closeButton: PropTypes.string
  }).isRequired,
  /**
   * Components of the modal.
   */
  children: PropTypes.node.isRequired,
  /**
   * Current state of the modal.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function executed on close.
   */
  onClose: PropTypes.func.isRequired
};

export default Main;
