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
import PropTypes, { shape } from "prop-types";

import Typography from "@material-ui/core/Typography";
import HvNavigationAnchors from "@hv-ui/react/core/NavigationAnchors";

class HvFormComposer extends React.Component {
  constructor(props) {
    super(props);

    const { groups } = this.props;

    this.state = {
      componentValues: this.getInitialValuesFromComponents(groups)
    };
  }

  /**
   * Gets the values that are set on each component inside the groups.
   *
   * @param {Object} groups - Initial group object containing all the component elements.
   * @return {Object} - { key (Component name): value (Value set on the component) }
   */
  getInitialValuesFromComponents = groups => {
    const componentValues = {};
    groups.forEach(group => {
      group.children.forEach(child => {
        componentValues[child.props.name] = child.props.value;
      });
    });

    return componentValues;
  };

  /**
   * Gets the values stored in the state of each component.
   */
  getValues = () => {
    const { componentValues } = this.state;
    return componentValues;
  };

  /**
   * Handler to retrieve the values.
   *
   * @param {Function} originalHandler - The handler that was originally triggered.
   */
  getValuesHandler = originalHandler => {
    if (
      originalHandler !== undefined &&
      typeof originalHandler === "function"
    ) {
      originalHandler(this.getValues());
    }
  };

  /**
   * Stores the value on the state when a child component onChange event is triggered.
   *
   * @param {*} value - Value that will be stored on the state.
   * @param {string} name - Name of the component.
   * @param {Function} onChange - Original function triggered by the component.
   */
  childOnChangeHandler = (value, name, onChange) => {
    const { componentValues } = this.state;

    const newComponentValues = { ...componentValues };
    newComponentValues[name] = value;

    this.setState({ componentValues: newComponentValues });

    if (onChange !== undefined && typeof onChange === "function") {
      return onChange(value);
    }
    // The UI-KIT input forced to have the value explicitly returned on the onChanged function.
    return value;
  };

  render() {
    const {
      classes,
      mainTitle,
      groups,
      hasNavigation,
      hasFooter,
      footerContent
    } = this.props;

    const footerElements = footerContent.map((child, i) => {
      const key = `fc-${i}`;
      return React.cloneElement(child, {
        onClick: () => this.getValuesHandler(child.props.onClick),
        key
      });
    });

    const navigationOptions = [];

    const groupedComponents = groups.map(group => {
      navigationOptions.push({ label: group.title, value: group.title });

      return (
        <div key={group.title}>
          <Typography id={group.title} className={classes.groupTitle}>
            {group.title}
          </Typography>
          {group.children.map((child, i) => {
            const key = `fc-${group.title}-${i}`;
            return (
              <div key={key}>
                {React.cloneElement(child, {
                  onChange: value =>
                    this.childOnChangeHandler(
                      value,
                      child.props.name,
                      child.props.onChange
                    )
                })}
              </div>
            );
          })}
        </div>
      );
    });

    return (
      <div className={classes.root}>
        <Typography className={classes.title}>{mainTitle}</Typography>
        <div className={classes.mainContainer}>
          {hasNavigation && (
            <div className={classes.navContainer}>
              <HvNavigationAnchors
                options={navigationOptions}
                floating={false}
              />
            </div>
          )}
          <div className={classes.componentContainer}>{groupedComponents}</div>
        </div>
        {hasFooter && (
          <div className={classes.footer}>{footerElements}</div>
        )}
      </div>
    );
  }
}

HvFormComposer.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the form composer.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Main title to be displayed.
   */
  mainTitle: PropTypes.string,
  /**
   * The group of component that will be added to the Form composer.
   */
  groups: PropTypes.arrayOf(
    shape({
      title: PropTypes.string,
      children: PropTypes.node
    })
  ).isRequired,
  /**
   * Shows navigation bar.
   */
  hasNavigation: PropTypes.bool,
  /**
   * Shows footer.
   */
  hasFooter: PropTypes.bool,
  /**
   * Content to be shown on the footer.
   */
  footerContent: PropTypes.node
};

/**
 * Default properties.
 */
HvFormComposer.defaultProps = {
  mainTitle: "",
  hasNavigation: false,
  hasFooter: false,
  footerContent: []
};

export default HvFormComposer;
