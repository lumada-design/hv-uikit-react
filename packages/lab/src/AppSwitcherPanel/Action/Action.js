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
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import { Info } from "@hv/uikit-react-icons/dist/Generic";

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.state = { validIconUrl: true };
  }
  render() {
    const {
      classes,
      application: { name, description, iconUrl, iconElement, url, target },
    } = this.props;

    const renderApplicationIcon = () => {
      if (iconElement) {
        return iconElement;
      }
      if (iconUrl && this.state.validIconUrl) {
        return (
          <img
            className={classes.iconUrl}
            src={iconUrl}
            onError={(element) => {
              element.target.style.display = "none";
              this.setState({ validIconUrl: false });
            }}
          />
        );
      }
      return <div className={classes.dummyImage} />;
    };

    /**
     * Checks if the current url starts with the url received in the props.
     */
    const isSelected = window.location.href.startsWith(url);

    const renderElementWithLink = () => {
      return (
        <a href={url} target={target || "_top"} className={classes.link}>
          {renderElement()}
        </a>
      );
    };

    /**
     * Handles the onClick event and triggers the appropriate callback if it exists.
     */
    const handleOnClick = () => {
      const { onClickCallback, application } = this.props;

      if (onClickCallback) {
        onClickCallback({ ...application, isSelected });
      }
    };

    const renderElement = () => {
      return (
        <HvTypography
          component="div"
          variant={isSelected ? "selectedText" : "normalText"}
          role="button"
          className={`${classes.typography} ${
            isSelected ? classes.selected : ""
          }`}
          tabIndex={0}
          onClick={handleOnClick}
        >
          {renderApplicationIcon()}

          <span title={name}>{name}</span>

          {description && (
            <Info className={classes.iconInfo} title={description} />
          )}
        </HvTypography>
      );
    };

    return isSelected ? renderElement() : renderElementWithLink();
  }
}

Action.propTypes = {
  /**
   * The application data to be used to render the Action object.
   */
  application: PropTypes.shape({
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
  }).isRequired,
  /**
   * A Jss object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Callback triggered when the action is clicked.
   */
  onClickCallback: PropTypes.func,
};

Action.defaultProps = {
  target: "_top",
  onClickCallback: () => {}
};
