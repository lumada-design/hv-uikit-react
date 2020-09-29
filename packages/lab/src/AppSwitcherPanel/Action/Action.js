import React, { Component } from "react";
import PropTypes from "prop-types";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import { Info } from "@hv/uikit-react-icons/dist";

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.state = { validIconUrl: true };
  }
  render() {
    const { classes, application, isSelectedCallback } = this.props;

    const renderApplicationIcon = () => {
      if (application.iconElement) {
        return application.iconElement;
      }
      if (application.iconUrl && this.state.validIconUrl) {
        return (
          <img
            className={classes.iconUrl}
            src={application.iconUrl}
            onError={(element) => {
              element.target.style.display = "none";
              this.setState({ validIconUrl: false });
            }}
          />
        );
      }
      return <div className={classes.dummyImage} />;
    };

    const isSelected = isSelectedCallback(application);

    const renderElementWithLink = () => {
      return (
        <a href={application.url} target={application.target || "_top"} className={classes.link}>
          {renderElement()}
        </a>
      );
    };

    /**
     * Handles the onClick event and triggers the appropriate callback if it exists.
     */
    const handleOnClick = (event) => {
      const { onClickCallback } = this.props;

      if (onClickCallback) {
        onClickCallback(event, { ...application, isSelected });
      }
    };

    const renderElement = () => {
      return (
        <HvTypography
          component="div"
          variant={isSelected ? "selectedText" : "normalText"}
          role="button"
          className={`${classes.typography} ${isSelected ? classes.selected : ""}`}
          tabIndex={0}
          onClick={handleOnClick}
        >
          {renderApplicationIcon()}

          <span title={application.name}>{application.name}</span>

          {application.description && (
            <Info className={classes.iconInfo} title={application.description} />
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
     *  URL where the application is accessible.
     */
    url: PropTypes.string.isRequired,
    /**
     * Defines if the application should be opened in the same tab or in a new one.
     */
    target: PropTypes.oneOf(["_top", "_blank"]),
    /**
     * True when the application is selected, false otherwise.
     */
    isSelected: PropTypes.bool,
  }).isRequired,
  /**
   * A Jss object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Callback triggered when the action is clicked.
   */
  onClickCallback: PropTypes.func,
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isSelectedCallback: PropTypes.func,
};

Action.defaultProps = {
  target: "_top",
  onClickCallback: (event, application) => {},
  isSelectedCallback: () => false,
};
