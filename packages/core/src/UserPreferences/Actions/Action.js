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

import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import HvTypography from "../../Typography";
import useUniqueId from "../../useUniqueId";

const Action = ({
  theme,
  classes,
  className,
  id,
  label,
  icon,
  onClick,
  ...others
}) => {
  const internalId = useUniqueId(id, "hv-userpreferences-action-");

  const payload = { id, label };

  const handleKeyDown = useCallback(
    event => {
      if (
        onClick == null ||
        (!isKeypress(event, KeyboardCodes.Enter) &&
          !isKeypress(event, KeyboardCodes.SpaceBar))
      ) {
        return;
      }

      onClick(event, payload);
    },
    [onClick, payload]
  );

  const handleClick = event => onClick(event, payload);

  const renderedIcon = useMemo(
    () =>
      icon &&
      React.cloneElement(icon, {
        boxStyles: { width: "32px", height: "32px" }
      }),
    [icon]
  );

  return (
    <HvTypography
      id={internalId}
      component="div"
      variant="normalText"
      role="button"
      className={classNames(className, classes.action, {
        [classes.noIcon]: !icon
      })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...others}
    >
      {renderedIcon}
      {label}
    </HvTypography>
  );
};

Action.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * Id to be applied to the action.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    action: PropTypes.string,
    /**
     * Style applied when no icon is present.
     */
    noIcon: PropTypes.string
  }).isRequired,
  /**
   * Visual label.
   */
  label: PropTypes.string,
  /**
   * Icon.
   */
  icon: PropTypes.node,
  /**
   * Callback called when clicked.
   */
  onClick: PropTypes.func
};

Action.defaultProps = {
  theme: undefined,
  id: undefined,
  className: undefined,
  label: undefined,
  icon: undefined,
  onClick: undefined
};

export default Action;
