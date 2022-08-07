import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { CurrentStep, RadioButtonUnselected } from "@hitachivantara/uikit-react-icons";

import { HvRadio, HvRadioGroup } from "..";
import styles from "./styles";

export const getSelectorIcons = (classes, options) => {
  const { disabled } = options;
  const color = (disabled && ["atmo3", "atmo5"]) || undefined;
  const checkedColor = (disabled && ["atmo3", "atmo5"]) || undefined;

  return {
    radio: <RadioButtonUnselected color={color} className={classes.icon} iconSize="XS" />,
    radioChecked: <CurrentStep color={checkedColor} className={classes.icon} iconSize="XS" />,
  };
};

/**
 * Pagination is the process of dividing a document into discrete pages. It relates to how users interact with structured content on a website or application.
 * This component uses Radio Buttons to represent each page.
 */
const HvDotPagination = (props) => {
  const {
    className,
    classes,
    pages = 1,
    page = 0,
    onPageChange,
    getItemAriaLabel,
    ...others
  } = props;

  const range = (n) => Array.from(Array(n), (v, i) => i);

  const icons = getSelectorIcons(classes, {});

  return (
    <HvRadioGroup
      className={clsx(className, classes.root)}
      classes={{ horizontal: classes.horizontal }}
      orientation="horizontal"
      {...others}
    >
      {range(pages).map((i) => (
        <HvRadio
          classes={{ root: classes.radioRoot }}
          key={i}
          value={i}
          checked={page === i}
          onChange={(event) => onPageChange(event, i)}
          icon={icons.radio}
          checkedIcon={icons.radioChecked}
          aria-label={getItemAriaLabel(i)}
        />
      ))}
    </HvRadioGroup>
  );
};

HvDotPagination.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the radio button group to overrrite horizontal class margins.
     */
    horizontal: PropTypes.string,
    /**
     *  Styles applied to the radio root ( to override radio group horizontal )
     */
    radioRoot: PropTypes.string,
  }).isRequired,
  /**
   *  The number of pages the component has.
   */
  pages: PropTypes.number,
  /**
   * The currently selected page.
   */
  page: PropTypes.number,
  /**
   * Function called when the page changes.
   */
  onPageChange: PropTypes.func,
  /**
   * Function called to get the respective aria label.
   */
  getItemAriaLabel: PropTypes.func,
};

export default withStyles(styles, { name: "HvDotPagination" })(HvDotPagination);
