import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import withId from "../withId";
import withLabels from "../withLabels";
import HvTypography from "../Typography";

import styles from "./styles";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "",
  infoText: "",
  warningText: "something wrong",
  maxCharQuantityWarningText: "The value is too big",
  minCharQuantityWarningText: "The value is too short",
  requiredWarningText: "The value is required",
  clearButtonLabel: "Clear the text"
};

/**
 * An input is a graphicl control element that allows the user to write text.
 */
const HvHelperText = props => {
  const { labels, classes, id, externalWarningTextOverride, variant, stateValidation } = props;

  const getTypographyType = chosenVariant => {
    return chosenVariant === "helper" ? "infoText" : "sText";
  };

  const getClassesToApply = chosenVariant => {
    let labelStyles;
    if (chosenVariant === "helper") {
      labelStyles = clsx(classes.infoText);
    } else if (chosenVariant === "warning") {
      labelStyles = clsx(classes.textWarning, classes.infoText, {
        // show the text if we are in an invalid state and either of the invalid labels exist
        [classes.showText]:
          stateValidation === "invalid" && (externalWarningTextOverride || labels.warningText)
      });
    }
    return labelStyles;
  };

  const getLabels = chosenVariant => {
    let labelToReturn;
    if (chosenVariant === "helper") {
      labelToReturn = labels.infoText;
    } else if (chosenVariant === "warning") {
      labelToReturn = externalWarningTextOverride || labels.warningText || "";
    }
    return labelToReturn;
  };

  let labelType;

  if (stateValidation !== "invalid") {
    labelType = variant;
  } else {
    labelType = "warning";
  }

  const ariaProps =
    stateValidation === "invalid"
      ? {
          "aria-live": "polite",
          "aria-controls": `${id}-input`,
          "aria-atomic": "true",
          "aria-relevant": "additions text",
          "aria-labelledby": labels.inputLabel ? `${id}-label` : null
        }
      : undefined;

  return (
    <>
      <HvTypography
        id={`${id}-description`}
        variant={getTypographyType(labelType)}
        className={getClassesToApply(labelType)}
        {...ariaProps}
      >
        {getLabels(labelType)}
      </HvTypography>
    </>
  );
};

HvHelperText.propTypes = {
  /**
   * The type of label to be rendered
   */
  variant: PropTypes.string,
  /**
   * Describes the state of the input
   */
  stateValidation: PropTypes.bool,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is invalid.
     */
    inputRootInvalid: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputDisabled: PropTypes.string,
    /**
     * Styles applied to the container of the suggestions list.
     */
    suggestionsContainer: PropTypes.string,
    /**
     * Styles applied to the suggestions list.
     */
    suggestionList: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    multiLine: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the label element when it is disabled.
     */
    labelDisabled: PropTypes.string,
    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the icon information container.
     */
    infoIconContainer: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    infoText: PropTypes.string,
    /**
     * Styles applied to the description.
     */
    text: PropTypes.string,
    /**
     * Styles applied to the description when it is showing an information.
     */
    textInfo: PropTypes.string,
    /**
     * Styles applied to the description when it is showing a warning.
     */
    textWarning: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
    /**
     * Styles applied to the input adornment icons.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon used to clean the input.
     */
    iconClear: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various texts associated with the input.
   */
  labels: PropTypes.shape({
    /**
     * The label on top of the input.
     */
    inputLabel: PropTypes.string,
    /**
     * The placeholder value of the input.
     */
    placeholder: PropTypes.string,
    /**
     * The default value of the info text below the input.
     */
    infoText: PropTypes.string,
    /**
     * The value when a validation fails.
     */
    warningText: PropTypes.string,
    /**
     * The message that appears when there are too many characters.
     */
    maxCharQuantityWarningText: PropTypes.string,
    /**
     * The message that appears when there are too few characters.
     */
    minCharQuantityWarningText: PropTypes.string,
    /**
     * The message that appears when the input is empty and required.
     */
    requiredWarningText: PropTypes.string,
    /**
     * The label of the clear button.
     */
    clearButtonLabel: PropTypes.string
  }),
  /**
   * Overrides any validation with a specific error/warning message to set in the warningText slot.
   */
  externalWarningTextOverride: PropTypes.string
};
HvHelperText.defaultProps = {
  variant: "labelText",
  id: undefined,
  externalWarningTextOverride: null
};

export default withStyles(styles, { name: "HvHelperText" })(
  withLabels(DEFAULT_LABELS)(withId(HvHelperText))
);
