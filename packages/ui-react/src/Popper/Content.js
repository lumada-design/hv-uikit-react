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

const Content = ({ classes, content, ...props }) => {
  const isObject = content && typeof content === "object";

  const ContentAsString = () => (
    <Typography className={classes.contentValue}>{content}</Typography>
  );

  const ContentAsObject = () =>
    Object.keys(content).map((key, index) => {
      const keyIdx = `${index}_${key}`;

      return (
        <div key={keyIdx} className="key-value">
          <Typography className={classes.contentKey}>{`${key}:`}</Typography>
          <Typography className={classes.contentValue}>
            {content[key]}
          </Typography>
        </div>
      );
    });

  return (
    <Popper placement="top" {...props} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={500}>
          <Paper className={classes.content}>
            {isObject ? <ContentAsObject /> : <ContentAsString />}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

Content.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])
    .isRequired
};

export default Content;
