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
import withStyles from "@material-ui/core/styles/withStyles";
import HvButton from "../../../Button";
import styles from "./styles";

// eslint-disable-next-line react/prop-types
const Divider = ({ classes }) => <span className={classes.separator} />;

const DividerStyled = withStyles(styles, { withTheme: true })(Divider);

const renderAction = (actions, actionsCallback, id) => {
  if (!Array.isArray(actions)) {
    return React.isValidElement(actions) ? actions : null;
  }

  const renderButton = (action, index) => {
    const needsSeparator = index > 0;
    return (
      <React.Fragment key={action.id}>
        {needsSeparator && <DividerStyled />}
        <HvButton
          disabled={action.disabled}
          onClick={() => actionsCallback(id, action)}
          category="semantic"
        >
          {(action.icon && action.icon()) ||
            (action.iconCallback && action.iconCallback())}
          {action.label}
        </HvButton>
      </React.Fragment>
    );
  };

  return actions.map((action, index) => renderButton(action, index));
};

export default renderAction;
