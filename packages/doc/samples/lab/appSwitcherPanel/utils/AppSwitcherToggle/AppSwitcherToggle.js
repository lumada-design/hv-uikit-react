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

import React, { Component } from "react";
import PropTypes from "prop-types";

import { HvButton } from "@hv/uikit-react-core/dist";
import { AppSwitcher } from "@hv/uikit-react-icons/dist/Generic";
import HvAppSwitcherPanel from "@hv/uikit-react-lab/dist/AppSwitcherPanel";

export default class AppSwitcherToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  /**
   * Closes the PanelContainer compoent.
   *
   * @memberof AppSwitcher
   */
  _closePanelContainer = () => {
    this.setState({
      isOpen: false,
    });
  };

  /**
   * Handles the click on the AppSwitcher button.
   *
   * @memberof AppSwitcher
   */
  handleClick = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  /**
   * Handles the click outside of the element.
   *
   * @memberof AppSwitcher
   */
  handleClickAway = () => this._closePanelContainer();

  render() {
    const { classes, panelRightSide } = this.props;
    const { isOpen } = this.state;

    const HvAppSwitcherPanelProps = {
      ...this.props,
      isOpen,
      classes: {
        open: panelRightSide ? classes.appSwitcherPanelOpenRight : classes.appSwitcherPanelOpen,
      },
    };

    return (
      <div className={classes.container}>
        <HvButton
          className={classes.iconWrapper}
          category="icon"
          onClick={this.handleClick}
        >
          <AppSwitcher />
        </HvButton>

        <HvAppSwitcherPanel {...HvAppSwitcherPanelProps} />
      </div>
    );
  }
}

AppSwitcherToggle.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to wrapper element for the icon.
     */
    iconWrapper: PropTypes.string,
  }).isRequired,
  /**
   * Flag stating if the panel is opened or closed.
   */
  isOpen: PropTypes.bool,
  /**
   * Title to be displayed on the header of the component.
   */
  title: PropTypes.string,
  /**
   * The list of applications to be used to render the actions on the component.
   */
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Name of the application, this is the value that will be displayed on the component.
       */
      name: PropTypes.string.isRequired,
      /**
       * URL with the icon location to be used to represent the application.
       */
      iconUrl: PropTypes.string,
      /**
       * Small description of the application.
       */
      description: PropTypes.string,
      /**
       *  URL where the application is accesible.
       */
      url: PropTypes.string,
      /**
       * TODO: Defines if the application should be opened in the same window or in a new one.
       */
      target: "",
    })
  ).isRequired,
  /**
   * Element to be added to the footer container.
   */
  footer: PropTypes.element,
};

AppSwitcherToggle.defaultProps = {
  isOpen: false,
  title: "Apps",
  footer: undefined,
};
