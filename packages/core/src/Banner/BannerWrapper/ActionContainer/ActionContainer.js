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

/*  TODO: Review accessibility */

import React from "react";
import Close from "@hv/uikit-react-icons/dist/Generic/CloseXS";
import PropTypes, { oneOfType } from "prop-types";
import renderAction from "../ActionRender/ActionRender";

/**
 * Container for the actions. This actions include:
 * - X button for close
 * - The passed actions
 * *
 * @param props
 * @returns {*}
 * @constructor
 */
const ActionContainer = ({
  id,
  theme,
  classes,
  onClose,
  action,
  actionCallback
}) => {
  let renderedAction;
  if (action)
    renderedAction = renderAction(action, actionCallback, id);

  return (
    <div className={classes.actionContainer}>
      <div
        className={classes.closeAction}
        role="button"
        onClick={onClose}
        tabIndex={0}
        onKeyDown={onClose}
      >
        <Close
          iconSize="XS"
          className={classes.iconContainer}
          color={[theme.hv.palette.base.base2]}
        />
      </div>
      {(renderedAction &&
        <div className={classes.actionsInnerContainer}>{renderedAction}</div>
      )}
    </div>
  );
};

ActionContainer.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /*
   * An object containing the palette color specificactions.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * onClose function.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Actions to display.
   */
  action: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func,
        disabled: PropTypes.bool
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionCallback: PropTypes.func
};

ActionContainer.defaultProps = {
  id: null,
  classes: "",
  action: undefined,
  actionCallback: () => {}
};

export default ActionContainer;
