import React, { useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import { HvTypography } from "@hv/uikit-react-core";
import { Info } from "@hv/uikit-react-icons";

import styles from "./styles";

const Action = (props) => {
  const {
    classes,
    application,
    onClickCallback = () => {},
    isSelectedCallback = () => false,
  } = props;

  const [validIconUrl, setValidIconUrl] = useState(true);

  const renderApplicationIcon = () => {
    if (application.iconElement) {
      return application.iconElement;
    }

    if (application.iconUrl && validIconUrl) {
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          className={classes.iconUrl}
          src={application.iconUrl}
          onError={() => {
            setValidIconUrl(false);
          }}
        />
      );
    }

    return <div className={classes.dummyImage} />;
  };

  const isSelected = isSelectedCallback(application);

  /**
   * Handles the onClick event and triggers the appropriate callback if it exists.
   */
  const handleOnClick = (event) => {
    onClickCallback?.(event, { ...application, isSelected });
  };

  const renderElement = () => {
    return (
      <HvTypography
        component="div"
        variant="normalText"
        role="button"
        className={clsx(classes.typography, {
          [classes.selected]: isSelected,
        })}
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

  const renderElementWithLink = () => {
    return (
      <a href={application.url} target={application.target || "_top"} className={classes.link}>
        {renderElement()}
      </a>
    );
  };

  return isSelected ? renderElement() : renderElementWithLink();
};

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
  classes: PropTypes.shape({
    iconUrl: PropTypes.string,
    dummyImage: PropTypes.string,
    link: PropTypes.string,
    typography: PropTypes.string,
    selected: PropTypes.string,
    iconInfo: PropTypes.string,
  }).isRequired,
  /**
   * Callback triggered when the action is clicked.
   */
  onClickCallback: PropTypes.func,
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isSelectedCallback: PropTypes.func,
};

export default withStyles(styles, { name: "HvAppSwitcherPanelAction" })(Action);
