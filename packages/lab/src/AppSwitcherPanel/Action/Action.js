import React, { useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { useTheme, withStyles } from "@material-ui/core";

import { HvTypography, HvAvatar, HvTooltip, HvListItem } from "@hv/uikit-react-core";
import { Info } from "@hv/uikit-react-icons";

import styles from "./styles";

import TitleWithTooltip from "../TitleWithTooltip";

const getColor = (theme, color, defaultColor) => theme.palette[color] || color || defaultColor;

const Action = (props) => {
  const {
    id,
    className,
    classes,
    application,
    onClickCallback = () => {},
    isSelectedCallback = () => false,
  } = props;

  const { name, description, disabled, iconElement, iconUrl, url, target } = application;

  const theme = useTheme();
  const color = disabled
    ? theme.hv.palette.atmosphere.atmo5
    : getColor(theme, application.color, theme.hv.palette.accent.acce1);

  const [validIconUrl, setValidIconUrl] = useState(true);

  const renderApplicationIcon = () => {
    if (iconElement) {
      return iconElement;
    }

    if (iconUrl && validIconUrl) {
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          className={classes.iconUrl}
          src={iconUrl}
          onError={() => {
            setValidIconUrl(false);
          }}
        />
      );
    }

    const brokenTitle = name.split(" ");
    const initials =
      brokenTitle[0].substring(0, 1) + (brokenTitle[1] ? brokenTitle[1].substring(0, 1) : "");

    return (
      <HvAvatar size="S" backgroundColor={color} variant="square">
        {initials}
      </HvAvatar>
    );
  };

  const isSelected = isSelectedCallback(application);

  /**
   * Handles the onClick event and triggers the appropriate callback if it exists.
   */
  const handleOnClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClickCallback?.(event, { ...application, isSelected });
  };

  const isLink = url != null;

  return (
    <HvListItem
      id={id}
      interactive
      tabIndex={0}
      selected={isSelected}
      disabled={disabled}
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled,
        [classes.selected]: isSelected,
      })}
    >
      <HvTypography
        component={isLink ? "a" : "button"}
        href={isLink ? url : undefined}
        target={isLink ? target || "_top" : undefined}
        className={classes.typography}
        onClick={handleOnClick}
        style={{ borderColor: color }}
      >
        <div className={classes.icon}>{renderApplicationIcon()}</div>

        <TitleWithTooltip title={name} className={classes.title} />

        {description && (
          <HvTooltip
            disableFocusListener
            disableTouchListener
            title={<HvTypography>{description}</HvTypography>}
          >
            <div>
              <Info className={classes.iconInfo} />
            </div>
          </HvTooltip>
        )}
      </HvTypography>
    </HvListItem>
  );
};

Action.propTypes = {
  /**
   * Identifier to be applied to the root element.
   */
  id: PropTypes.string,

  /**
   * Class names to be applied to the root element.
   */
  className: PropTypes.string,
  /**
   * A Jss object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    disabled: PropTypes.string,
    typography: PropTypes.string,
    selected: PropTypes.string,
    icon: PropTypes.string,
    iconUrl: PropTypes.string,
    title: PropTypes.string,
    iconInfo: PropTypes.string,
  }).isRequired,

  /**
   * The application data to be used to render the Action object.
   */
  application: PropTypes.shape({
    /**
     * Id of the application.
     */
    id: PropTypes.string,
    /**
     * Name of the application, this is the value that will be displayed on the component.
     */
    name: PropTypes.string.isRequired,
    /**
     * The color to be applied to the item's border and to the default icon.
     * You can use either an HEX or color name from the palette.
     */
    color: PropTypes.string,
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
    url: PropTypes.string,
    /**
     * Defines if the application should be opened in the same tab or in a new one.
     */
    target: PropTypes.oneOf(["_top", "_blank"]),
    /**
     * If true, the item will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * True when the application is selected, false otherwise.
     */
    isSelected: PropTypes.bool,
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
