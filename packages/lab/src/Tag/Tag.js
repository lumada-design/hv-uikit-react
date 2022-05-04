import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@mui/styles";
import { Close } from "@hitachivantara/uikit-react-icons";
import { useDeprecated } from "@hitachivantara/uikit-react-core";

import styles from "./styles";

/**
 * The tag is a component used to notify the user about the labelled ,categorised, or organised item , in the app context.
 */
const useStyles = makeStyles(styles, { name: "HvTag" });

const getColor = (theme, color, defaultColor) => theme.palette[color] || color || defaultColor;
export const HvTag = (props) => {
  const {
    id,
    semantic,
    children,
    disabled,
    variant,
    color,
    shape,
    showcancelicon = false,
    ...others
  } = props;

  useDeprecated("Tag", "Please use the Tag component in Core");
  const classes = useStyles();
  const isDisabled = disabled || false;
  const Tagshape = shape || classes.square;
  const theme = useTheme();
  const inlineStyle = {};

  if (semantic) {
    inlineStyle.backgroundColor = getColor(
      theme,
      theme.palette?.[semantic],
      theme.hv.palette.accent.acce1
    );
  }

  /**
   * Renders the content for the tag elements.
   */
  return (
    <div
      id={id}
      role="button"
      className={clsx(
        classes.root,
        classes[variant],
        { ...others },
        {
          [classes.disabled]: isDisabled,
          [classes[`${shape}`]]: Tagshape,
        }
      )}
      style={inlineStyle}
      disabled={isDisabled}
      {...others}
    >
      <span className={classes.label}>{children}</span>
      {showcancelicon && (
        <Close
          className={clsx(classes.deleteIcon, {
            [classes.disabled]: isDisabled,
          })}
          color="atmo5"
        />
      )}
    </div>
  );
};

HvTag.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   *   A Jss Object used to override or extend the styles applied to the tag.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the component when it is tag.
     */
    square: PropTypes.string,
    /**
     * Styles applied to the component when it is chip.
     */
    round: PropTypes.string,

    /**
     * Styles applied to the component when shows label.
     */
    deleteIcon: PropTypes.string,
    /**
     * Styles applied to the component when disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the button if keyboard focused.
     */
    focusVisible: PropTypes.string,
  }),
  /**
   * A String representing the background color of the tag.
   * You can use either an HEX or color name from the palette.
   */
  backgroundColor: PropTypes.string,
  /**
   * Category of tag to use
   */
  variant: PropTypes.oneOf(["informational", "success", "warning", "error", "categorical"]),
  /**
   * A String or Array of strings representing the colors to override in the icon.
   * Each element inside the array will override a diferent color.
   * You can use either an HEX or color name from the palette.
   */
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /**
   * Sets one of the standard semantic palette colors of the icon
   */
  semantic: PropTypes.oneOf([
    "sema1",
    "sema2",
    "sema3",
    "sema4",
    "sema5",
    "sema6",
    "sema7",
    "sema8",
    "sema9",
    "sema10",
    "sema11",
    "sema12",
    "sema13",
    "sema14",
    "sema15",
    "sema16",
    "sema17",
    "sema18",
    "sema19",
    "sema20",
  ]),
  shape: PropTypes.string,
  /**
   * The content of the Tag.
   */
  children: PropTypes.node.isRequired,
  /**
   * The disabled property of the Tag.
   */
  disabled: PropTypes.string,
  /**
   * The cancel icon is shown based on this property
   */
  showcancelicon: PropTypes.bool,
};

export default withStyles(styles, { name: "HvTag" })(HvTag);
