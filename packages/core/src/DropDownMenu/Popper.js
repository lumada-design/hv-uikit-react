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

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

/**
 * Taken from Material ui from https://github.com/mui-org/material-ui/blob/v3.x/packages/material-ui/src/Popper/Popper.js
 * We cant update to the new version which has the behaviour we need. But we can totally remove this module once we have
 * the new Material ui (post 4.x)
 */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import PopperJS from "popper.js";
import Portal from "@material-ui/core/Portal";

function flipPlacement(placement) {
  const direction =
    (typeof window !== "undefined" && document.body.getAttribute("dir")) ||
    "ltr";

  if (direction !== "rtl") {
    return placement;
  }

  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
class Popper extends React.Component {
  constructor(props) {
    super();
    this.state = {
      exited: !props.open
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.open !== this.props.open &&
      !this.props.open &&
      !this.props.transition
    ) {
      // Otherwise handleExited will call this.
      this.handleClose();
    }

    // Let's update the popper position.
    if (
      prevProps.open !== this.props.open ||
      prevProps.anchorEl !== this.props.anchorEl ||
      prevProps.popperOptions !== this.props.popperOptions ||
      prevProps.modifiers !== this.props.modifiers ||
      prevProps.disablePortal !== this.props.disablePortal ||
      prevProps.placement !== this.props.placement
    ) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.open) {
      return {
        exited: false
      };
    }

    if (!nextProps.transition) {
      // Otherwise let handleExited take care of marking exited.
      return {
        exited: true
      };
    }

    return null;
  }

  handleOpen = () => {
    const {
      anchorEl,
      modifiers,
      open,
      placement,
      popperOptions = {},
      disablePortal
    } = this.props;
    const popperNode = ReactDOM.findDOMNode(this);

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
      placement: flipPlacement(placement),
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
              // It's using scrollParent by default, we can use the viewport when using a portal.
              preventOverflow: {
                boundariesElement: "window"
              }
            }),
        ...modifiers,
        ...popperOptions.modifiers
      },
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: this.handlePopperCreate,
      onUpdate: this.handlePopperUpdate
    });
    // Used for recalculate positioning after render.
    this.popper.scheduleUpdate();
  };

  updatePopperPlacement = placement => {
    if (placement !== this.state.placement) {
      this.setState({
        placement
      });
    }
  };

  handlePopperCreate = data => {
    const { popperOptions } = this.props;
    this.updatePopperPlacement(data.placement);
    popperOptions.onCreate && popperOptions.onCreate(data);
  };

  handlePopperUpdate = data => {
    const { popperOptions } = this.props;
    this.updatePopperPlacement(data.placement);
    popperOptions.onUpdate && popperOptions.onUpdate(data);
  };

  handleExited = () => {
    this.setState({ exited: true });
    this.handleClose();
  };

  handleClose = () => {
    if (!this.popper) {
      return;
    }

    this.popper.destroy();
    this.popper = null;
  };

  render() {
    const {
      anchorEl,
      children,
      container,
      disablePortal,
      keepMounted,
      modifiers,
      open,
      placement: placementProps,
      popperOptions,
      transition,
      ...other
    } = this.props;
    const { exited, placement } = this.state;

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    const childProps = {
      placement: placement || flipPlacement(placementProps)
    };

    if (transition) {
      childProps.TransitionProps = {
        in: open,
        onExited: this.handleExited
      };
    }

    return (
      <Portal
        onRendered={this.handleOpen}
        disablePortal={disablePortal}
        container={container}
      >
        <div
          role="tooltip"
          style={{
            // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
            position: "absolute"
          }}
          {...other}
        >
          {typeof children === "function" ? children(childProps) : children}
        </div>
      </Portal>
    );
  }
}

Popper.propTypes = {
  /**
   * This is the DOM element, or a function that returns the DOM element,
   * that may be used to set the position of the popover.
   * The return value will passed as the reference object of the Popper
   * instance.
   */
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
   */
  modifiers: PropTypes.object,
  /**
   * If `true`, the popper is visible.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   */
  placement: PropTypes.oneOf([
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top"
  ]),
  /**
   * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
   */
  popperOptions: PropTypes.object,
  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition: PropTypes.bool
};

Popper.defaultProps = {
  disablePortal: false,
  placement: "bottom",
  transition: false
};

export default Popper;
