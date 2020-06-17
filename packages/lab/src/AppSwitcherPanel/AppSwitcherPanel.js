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
import uniqueId from "lodash/uniqueId";

import Action from "./Action";

export default class AppSwitcherPanel extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props;

    this.state = {
      internalId: id || uniqueId("hv-appswitcherpanel-")
    };
  }

  render() {
    const { internalId } = this.state;
    const {
      classes,
      isOpen,
      title,
      applications,
      header,
      footer,
      onActionClickedCallback,
      isActionSelectedCallback
    } = this.props;

    const actionClicked = application => {
      if (onActionClickedCallback) {
        onActionClickedCallback(application);
      }
    };

    const panelActions = applications.map((application, index) => {
      if (application.name && application.url) {
        return (
          <Action
            key={index}
            application={application}
            onClickCallback={actionClicked}
            isSelectedCallback={isActionSelectedCallback}
          />
        );
      }
    });

    return (
      <div
        id={internalId}
        className={`${classes.root} ${isOpen ? classes.open : ""}`}>
        <div className={classes.headerContainer}>
          {header ? (
            header
          ) : (
            <div className={classes.titleContainer}>
              <div className={classes.title} title={title}>
                {title}
              </div>
            </div>
          )}
        </div>
        <div className={classes.actionsContainer}>{panelActions}</div>
        {footer && <div className={classes.footerContainer}>{footer}</div>}
      </div>
    );
  }
}

AppSwitcherPanel.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({}).isRequired,
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
       * Id of the application.
       */
      id: PropTypes.string.isRequired,
      /**
       * Name of the application, this is the value that will be displayed on the component.
       */
      name: PropTypes.string.isRequired,
      /**
       * URL with the icon location to be used to represent the application.
       * iconUrl will only be used if no iconElement is provided.
       */
      iconUrl: PropTypes.string,
      /**
       * Element to be added as the icon representing the application.
       * The iconElement will be the primary option to be displayed.
       */
      iconElement: PropTypes.element,
      /**
       * Small description of the application.
       */
      description: PropTypes.string,
      /**
       *  URL where the application is accesible.
       */
      url: PropTypes.string.isRequired,
      /**
       * Defines if the application should be opened in the same tab or in a new one.
       */
      target: PropTypes.oneOf(["_top", "_blank"]),
      /**
       * Callback triggered when the action is clicked
       */
      onClickCallback: PropTypes.func
    })
  ).isRequired,
  /**
   * Element to be added to the header container, if none is provided a label with the title will be added.
   */
  header: PropTypes.element,
  /**
   * Element to be added to the footer container.
   */
  footer: PropTypes.element,
  /**
   * Triggered when an action is clicked.
   */
  onActionClickedCallback: PropTypes.element.func,
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback: PropTypes.element.func
};

AppSwitcherPanel.defaultProps = {
  isOpen: false,
  title: "Apps",
  footer: undefined,
  onActionClickedCallback: () => {},
  isActionSelectedCallback: () => false
};
