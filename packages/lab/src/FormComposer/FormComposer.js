import React from "react";
import PropTypes, { shape } from "prop-types";
import { withStyles } from "@mui/styles";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import HvNavigationAnchors from "../NavigationAnchors";
import styles from "./styles";

/**
 * A form composer component used to create a form dynamically, still in development
 */
class HvFormComposer extends React.Component {
  constructor(props) {
    super(props);

    const { groups } = this.props;

    this.state = {
      componentValues: this.getInitialValuesFromComponents(groups),
    };
  }

  /**
   * Gets the values that are set on each component inside the groups.
   *
   * @param {Object} groups - Initial group object containing all the component elements.
   * @return {Object} - { key (Component name): value (Value set on the component) }
   */
  getInitialValuesFromComponents = (groups) => {
    const componentValues = {};
    groups.forEach((group) => {
      group.children.forEach((child) => {
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
  getValuesHandler = (originalHandler) => {
    if (originalHandler !== undefined && typeof originalHandler === "function") {
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
    const { classes, mainTitle, groups, hasNavigation, hasFooter, footerContent } = this.props;

    const footerElements = footerContent.map((child, i) => {
      const key = `fc-${i}`;
      return React.cloneElement(child, {
        onClick: () => this.getValuesHandler(child.props.onClick),
        key,
      });
    });

    const navigationOptions = [];

    const groupedComponents = groups.map((group) => {
      navigationOptions.push({ label: group.title, value: group.title });

      return (
        <div key={group.title}>
          <HvTypography id={group.title} variant="mTitle">
            {group.title}
          </HvTypography>
          {group.children.map((child, i) => {
            const key = `fc-${group.title}-${i}`;
            return (
              <div key={key}>
                {React.cloneElement(child, {
                  onChange: (event, value) =>
                    this.childOnChangeHandler(value, child.props.name, child.props.onChange),
                })}
              </div>
            );
          })}
        </div>
      );
    });

    return (
      <div className={classes.root}>
        <HvTypography variant="xlTitle" className={classes.title}>
          {mainTitle}
        </HvTypography>
        <div className={classes.mainContainer}>
          {hasNavigation && (
            <div className={classes.navContainer}>
              <HvNavigationAnchors options={navigationOptions} floating={false} />
            </div>
          )}
          <div className={classes.componentContainer}>{groupedComponents}</div>
        </div>
        {hasFooter && <div className={classes.footer}>{footerElements}</div>}
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
      children: PropTypes.node,
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
  footerContent: PropTypes.node,
};

/**
 * Default properties.
 */
HvFormComposer.defaultProps = {
  mainTitle: "",
  hasNavigation: false,
  hasFooter: false,
  footerContent: [],
};

export default withStyles(styles, { name: "HvFormComposer" })(HvFormComposer);
