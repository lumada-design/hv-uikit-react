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

import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";

import useUniqueId from "../../useUniqueId";

import HvTypography from "../../Typography";

const Action = ({ theme, classes, id, label, icon, onClick, ...others }) => {
  const internalId = useUniqueId(id, "hv-verticalnavigation-action-");

  const handleKeyDown = useCallback(
    event => {
      if (
        onClick == null ||
        (!isKeypress(event, KeyboardCodes.Enter) &&
          !isKeypress(event, KeyboardCodes.SpaceBar))
      ) {
        return;
      }

      onClick(event);
    },
    [onClick]
  );

  const renderedIcon = useMemo(
    () => icon && React.cloneElement(icon, { className: classes.box }),
    [classes.box, icon]
  );

  return (
    <HvTypography
      id={`${internalId}-button`}
      component="div"
      variant="normalText"
      role="button"
      className={classNames(classes.action, { [classes.noIcon]: !icon })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
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
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component.
     */
    action: PropTypes.string,
    /**
     * Style applied to the box of the icon.
     */
    box: PropTypes.string,
    /**
     * Style applied when no icon is present.
     */
    noIcon: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the action.
   */
  id: PropTypes.string,
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
  label: "",
  icon: undefined,
  onClick: undefined
};

export default Action;
