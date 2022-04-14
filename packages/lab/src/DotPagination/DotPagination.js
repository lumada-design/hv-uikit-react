import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { HvRadio, HvRadioGroup } from "@hitachivantara/uikit-react-core";
import { CurrentStep, RadioButtonUnselected } from "@hitachivantara/uikit-react-icons";
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
 * DotPagination description/documentation paragraph
 */
const HvDotPagination = (props) => {
  const {
    className,
    classes,
    pages = 1,
    page = 0,
    onPageChange,
    getItemAriaLabel,
    id,
    ...others
  } = props;

  const range = (n) => Array.from(Array(n), (v, i) => i);

  const icons = getSelectorIcons(classes, {});

  return (
    <div className={clsx(className, classes.root)} {...others}>
      <HvRadioGroup classes={{ horizontal: classes.horizontal }} orientation="horizontal">
        {range(pages).map((pg, i) => (
          <HvRadio
            classes={{ root: classes.radioRoot }}
            key={`dot_navigation${id && id.toString()}_item${i.toString()}`}
            value={i}
            checked={page === i}
            onChange={() => onPageChange(i)}
            icon={icons.radio}
            checkedIcon={icons.radioChecked}
            aria-label={getItemAriaLabel(i)}
          />
        ))}
      </HvRadioGroup>
    </div>
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
   * The currently selected page (0-indexed).
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
  /**
   *  Component id used to generate unique radio keys ( to avoid repeated keys in case multiple dotPagination components are needed)
   */
  id: PropTypes.number,
};

export default withStyles(styles, { name: "HvDotPagination" })(HvDotPagination);
