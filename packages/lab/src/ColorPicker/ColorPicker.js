import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles, useTheme } from "@material-ui/core";
import {
  HvPanel,
  HvLabel,
  HvInfoMessage,
  HvFormElement,
  HvBaseDropdown,
  useControlled,
  HvTypography,
  useUniqueId,
  setId,
} from "@hitachivantara/uikit-react-core";
import { Checkbox } from "@hitachivantara/uikit-react-icons";

import styles from "./styles";
import Picker from "./Picker";
import PresetColors from "./PresetColors";

/**
 * A color picker component which allows the user to select a color from a list of pre-defined colors or freely select one color via the Hue and Saturation.
 * It receives a color string in HEX format and outputs an HEX formatted color.
 */
const HvColorPicker = (props) => {
  const theme = useTheme();
  const {
    id,
    name,

    required = false,
    disabled = false,

    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,
    className,
    classes,
    value,
    onChange,
    defaultValue = theme.hv.palette.accent.acce1,

    expanded,
    defaultExpanded = false,
  } = props;

  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));
  const [color, setColor] = useControlled(value, defaultValue);

  const handleToggle = (_evt, s) => {
    setIsOpen(s);
  };

  const handleSelect = (val) => {
    onChange?.(val.hex);
    setColor(val.hex);
  };

  const elementId = useUniqueId(id, "hvdropdown");

  const hasLabel = label != null;
  const hasDescription = description != null;

  const colorArray = useMemo(
    () => [
      theme.hv.palette.semantic.sema4,
      theme.hv.palette.semantic.sema3,
      "#F6941E",
      "#8DC63D",
      theme.hv.palette.semantic.sema1,
      theme.hv.palette.semantic.sema19,
      "#05A99C",
      "#01ADEF",
      theme.hv.palette.accent.acce2h,
      "#0155A5",
      "#2E3192",
      "#652C90",
      theme.hv.palette.semantic.sema6,
      "#EC018B",
      theme.hv.palette.atmosphere.atmo5,
      theme.hv.palette.accent.acce1,
    ],
    [theme]
  );

  const setFocusToContent = (containerRef) => {
    const inputs = containerRef?.getElementsByTagName("input");
    if (inputs?.length > 0) {
      inputs[0].focus();
    }
  };

  return (
    <HvFormElement
      id={id}
      name={name}
      disabled={disabled}
      required={required}
      className={clsx(className, classes.root)}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel id={setId(elementId, "label")} label={label} className={classes.label} />
          )}

          {hasDescription && (
            <HvInfoMessage id={setId(elementId, "description")} className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}
      <HvBaseDropdown
        className={className}
        expanded={isOpen}
        onToggle={handleToggle}
        onContainerCreation={setFocusToContent}
        placeholder={
          <>
            <Checkbox className={classes.headerColorIcon} color={[color]} />
            <HvTypography className={classes.headerColorValue}>{color}</HvTypography>
          </>
        }
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy].join(" ").trim() || undefined
        }
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy].join(" ").trim() ||
          undefined
        }
      >
        <HvPanel className={classes.panel}>
          <div className={classes.colorPicker}>
            <Picker color={color} onChange={handleSelect} />
            <PresetColors colors={colorArray} onClick={handleSelect} />
          </div>
        </HvPanel>
      </HvBaseDropdown>
    </HvFormElement>
  );
};

HvColorPicker.propTypes = {
  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,

  /**
   * The form element name.
   */
  name: PropTypes.string,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  "aria-labelledby": PropTypes.string,
  /**
   * Provide additional descriptive text for the form element.
   */
  description: PropTypes.node,
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,

  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that user input is required on the form element.
   */
  required: PropTypes.bool,

  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    labelContainer: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    headerColorIcon: PropTypes.string,
    headerColorValue: PropTypes.string,
    panel: PropTypes.string,
    colorPicker: PropTypes.string,
  }).isRequired,

  /**
   * If `true` the color picker starts opened if `false` it starts closed.
   */
  expanded: PropTypes.bool,
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * The value color, in HEX format.
   */
  value: PropTypes.string,

  /**
   * When uncontrolled, defines the initial value state.
   */
  defaultValue: PropTypes.string,
};

export default withStyles(styles, { name: "HvColorPicker" })(HvColorPicker);
