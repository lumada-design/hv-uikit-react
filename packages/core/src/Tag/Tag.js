import React, { useState } from "react";

import { Chip, withStyles, useTheme } from "@material-ui/core";

import PropTypes from "prop-types";
import clsx from "clsx";
import { CloseXS } from "@hv/uikit-react-icons";
import fade from "../utils/hexToRgbA";

import { HvButton } from "..";

import styles from "./styles";

import { getOnDeleteCallback, hasDeleteAction, hasClickAction } from "./utils";

const getColor = (theme, customColor, type) => {
  const defaultSemanticColor = theme.hv.palette.semantic.sema7;
  const defaultCategoricalColor = theme.hv.viz.palette.categorical.cviz1;

  let backgroundColor;

  if (type === "semantic") {
    backgroundColor = theme.palette[customColor] || customColor || defaultSemanticColor;
  }
  if (type === "categorical") {
    backgroundColor =
      theme.hv.viz.palette.categorical[customColor] || customColor || defaultCategoricalColor;
  }

  return backgroundColor;
};

/**
 * A Tag is one word that describes a specific aspect of an asset. A single asset can have
 * multiple tags.
 * Use tags to highlight an item's status for quick recognition and navigation
 * Use color to indicate meanings that users can learn and recognize across products
 *
 * It leverages the Chip component from Material UI
 */
const HvTag = (props) => {
  const {
    classes,
    style,
    className,
    label,
    disabled,
    type = "semantic",
    color,
    deleteIcon,
    onDelete,
    onClick,
    role,
    deleteButtonArialLabel = "Delete tag",
    ...others
  } = props;

  const getDeleteIcon = () => {
    const disabledSemanticColor = type === "semantic" ? "atmo5" : "base2";

    return (
      <HvButton
        classes={{
          startIcon: classes.tagButton,
          focusVisible: classes.focusVisible,
          primary: classes.primaryButton,
        }}
        aria-label={deleteButtonArialLabel}
      >
        <CloseXS
          iconSize="XS"
          style={{
            ...(disabled ? { cursor: "not-allowed" } : undefined),
            height: 16,
          }}
          color={disabled ? disabledSemanticColor : "base2"}
        />
      </HvButton>
    );
  };

  const theme = useTheme();

  const inlineStyle = {
    ...style,
  };

  let categoricalBackgroundColor;

  if (type === "semantic") {
    inlineStyle.backgroundColor = getColor(theme, color, type);
  } else if (type === "categorical") {
    categoricalBackgroundColor = getColor(theme, color, type);

    inlineStyle.backgroundColor = fade(categoricalBackgroundColor, 0.3);
  }

  const [hover, setHover] = useState(false);

  return (
    <Chip
      label={label}
      className={clsx(classes.root, className)}
      onMouseEnter={() => {
        setHover(!!onClick);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        ...(disabled ? null : inlineStyle),
        ...(hover && !disabled ? { boxShadow: `0 0 0 1pt ${categoricalBackgroundColor}` } : null),
      }}
      classes={{
        root: clsx(classes.chipRoot, {
          [classes.disabled]: disabled,
          [classes.clickable]: !!onClick,
          [classes.categorical]: type === "categorical",
          [classes.categoricalFocus]: type === "categorical" && !disabled,
          [classes.categoricalDisabled]: type === "categorical" && disabled,
        }),
        label: classes.label,
        deleteIcon: clsx(classes.deleteIcon, {
          [classes.disabledDeleteIcon]: disabled,
        }),
      }}
      deleteIcon={(hasDeleteAction(onDelete) && deleteIcon) || getDeleteIcon()}
      onDelete={getOnDeleteCallback(disabled, onDelete)}
      onClick={disabled ? undefined : onClick}
      role={role || (hasClickAction(onClick) ? "button" : undefined)}
      tabIndex={hasDeleteAction(onDelete) ? undefined : 0}
      {...others}
    />
  );
};

HvTag.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the radio button.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    chipRoot: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    tagButton: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    deleteIcon: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    disabledDeleteIcon: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    titleOverflow: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    categorical: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    categoricalDisabled: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    semanticTextColor: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    categoricalTextColor: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    deletable: PropTypes.string,
    /**
     * Styles applied to the component if has onClick.
     */
    clickable: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    focusVisible: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    primaryButton: PropTypes.string,
    /**
     * Styles applied to the component.
     */
    categoricalFocus: PropTypes.string,
  }).isRequired,

  /**
   * Inline styles to be applied to the root element.
   */
  style: PropTypes.instanceOf(Object),

  /**
   * Class names to be applied.
   */
  className: PropTypes.string,

  /**
   * The label of the tag element.
   *
   */
  label: PropTypes.node,

  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The type of the tag element.
   *
   * A tag can be of semantic or categoric type
   */
  type: PropTypes.oneOf(["semantic", "categorical"]),

  /**
   * Background color to be applied to the tag
   */
  color: PropTypes.string,
  /**
   * Icon used to customize the delete icon in the Chip element
   */
  deleteIcon: PropTypes.node,

  /**
   * The callback fired when the delete icon is pressed.
   * This function has to be provided to the component,
   * in order to render the delete icon
   */
  onDelete: PropTypes.func,
  /**
   * Callback triggered when any item is clicked.
   */
  onClick: PropTypes.func,

  /**
   * The role of the element with an attributed event.
   */
  role: PropTypes.string,
  /**
   * Aria properties to apply to delete button in tag
   */
  deleteButtonArialLabel: PropTypes.string,
};

export default withStyles(styles, { name: "HvTag" })(HvTag);
