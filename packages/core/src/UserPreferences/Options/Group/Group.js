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
import classNames from "classnames";
import PropTypes from "prop-types";
import Typography from "../../../Typography";
import useUniqueId from "../../../useUniqueId";

const Group = ({
  id,
  className,
  theme,
  classes,
  label,
  children,
  ...others
}) => {
  const internalId = useUniqueId(id, "hv-userpreference-group-");
  const labelId =
    (id && `hv-userpreference-grouplabel-${id}`) ||
    useUniqueId(id, "hv-userpreference-grouplabel-");

  return (
    <nav
      id={internalId}
      className={classNames(className, classes.root)}
      aria-labelledby={label ? labelId : undefined}
      {...others}
    >
      {label && (
        <Typography
          component="div"
          id={labelId}
          variant="labelText"
          className={classes.label}
        >
          {label}
        </Typography>
      )}
      <ul className={classes.ul}>{children}</ul>
    </nav>
  );
};

Group.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the ul component.
     */
    ul: PropTypes.string
  }).isRequired,
  /**
   * Label for the group.
   */
  label: PropTypes.string,
  /**
   * Children component.
   */
  children: PropTypes.node.isRequired
};

Group.defaultProps = {
  theme: undefined,
  id: undefined,
  className: undefined,
  label: undefined
};

export default Group;
