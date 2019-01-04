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
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

export const HvPopperContent = ({ classes, popperContent, ...props }) => (
  <Popper {...props} transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper>
          {Object.keys(popperContent).map((key, index) => (
            <div key={index}>
              <Typography className={classes.popperContentKey}>{`${key}:`}</Typography>
              <Typography className={classes.popperContentValue}>{popperContent[key]}</Typography>
            </div>
          ))}
        </Paper>
      </Fade>
    )}
  </Popper>
);

HvPopperContent.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  popperContent: PropTypes.instanceOf(Object).isRequired,
};
