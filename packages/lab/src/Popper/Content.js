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
    <Popper className={classes.popper} placement="top" {...props} transition>
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
