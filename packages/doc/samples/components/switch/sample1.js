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

import React, { useState } from "react";
import Switch from "@hv/uikit-react-core/dist/Switch";
import Typography from "@hv/uikit-react-core/dist/Typography";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
  on: {
    color: theme.hv.palette.semantic.sema1
  },
  off: {
    color: theme.hv.palette.semantic.sema13
  }
});

const StateString = withStyles(styles, {
  withTheme: true
})(({ state, classes, children }) => (
  <Typography
    className={classNames({ [classes.on]: state, [classes.off]: !state })}
  >
    {`The state is ${state ? "On" : "Off"}`}
  </Typography>
));

const OnChangeExample = ({ theme }) => {
  const [state, setState] = useState(false);

  return (
    <>
      <Switch
        checked={false}
        onChange={() => setState(!state)}
        aria-label="Engine Control"
      />
      <p />
      <StateString state={state} />
    </>
  );
};

export default <OnChangeExample />;
