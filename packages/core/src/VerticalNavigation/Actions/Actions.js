/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import { withStyles } from "@material-ui/core";
import useUniqueId from "../../useUniqueId";
import styles from "./styles";

const Actions = ({ theme, classes, id, children, ...others }) => {
  const internalId = useUniqueId(id, "hv-verticalnavigation-actions-");

  return (
    <div id={internalId} className={classes.root} {...others}>
      {children}
    </div>
  );
};

Actions.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the actions container.
   */
  id: PropTypes.string,
  /**
   * Node to be rendered
   */
  children: PropTypes.node
};

Actions.defaultProps = {
  theme: undefined,
  id: undefined,
  children: undefined
};

export default withStyles(styles, { name: "HvVerticalNavigationActions" })(
  Actions
);
