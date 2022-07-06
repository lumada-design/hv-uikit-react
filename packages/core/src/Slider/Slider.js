import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import { withStyles } from "@material-ui/core";
import { HvFormElement, useControlled, useUniqueId, HvLabel, setId, HvWarningText } from "..";
import validationStates from "../Forms/FormElement/validationStates";
import {
  knobsPositionToScaledValue,
  calculateStepValue,
  createKnobStyles,
  createTrackStyles,
  createMark,
  knobsValuesToKnobsPositions,
  knobsPositionsToKnobsValues,
  scaledValueToKnobsPositionValue,
  generateDefaultKnobProperties,
  isSingleSlider,
  ensureValuesConsistency,
  convertStatusToArray,
  statusArrayToFormStatus,
} from "./utils";
import styleCreator from "./styles";
import SliderInput from "./SliderInput";

/**
 * Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters. Still in development
 */
const HvSlider = (props) => {
  const {
    id,
    className,
    name,
    label,
    status,
    statusMessage,
    disabled,
    required = false,
    requiredMessage = "The value is required",
    readOnly = false,
    "aria-errormessage": ariaErrorMessage,
    classes,
    hideInput = false,
    markProperties = [],
    markStep = 20,
    markDigits = 0,
    knobProperties: knobPropertiesProp,
    values: valuesProp,
    defaultValues = [undefined],
    inputProps,
    theme,
    maxPointValue = 100,
    minPointValue = 0,
    divisionQuantity = 100,
    formatMark,
    noOverlap = true,
    onChange,
    onBlur,
    onBeforeChange,
    onAfterChange,
    formatTooltip,
    sliderProps,
    knobProps,
    ...others
  } = props;

  const styles = styleCreator(theme);
  const stepValue = useMemo(
    () => calculateStepValue(maxPointValue, minPointValue, divisionQuantity),
    [divisionQuantity, maxPointValue, minPointValue]
  );
  const inverseStepValue = 1 / stepValue;
  const isSingle = useMemo(
    () => isSingleSlider(valuesProp, defaultValues),
    [defaultValues, valuesProp]
  );
  const defaultKnobsPositions = useMemo(
    () => knobsValuesToKnobsPositions(defaultValues, inverseStepValue, minPointValue, isSingle),
    [defaultValues, inverseStepValue, isSingle, minPointValue]
  );
  const value = useMemo(
    () =>
      valuesProp?.length > 0
        ? knobsValuesToKnobsPositions(valuesProp, inverseStepValue, minPointValue, isSingle)
        : undefined,
    [inverseStepValue, isSingle, minPointValue, valuesProp]
  );

  const [knobsPositions, setKnobsPositions] = useControlled(value, defaultKnobsPositions);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);
  // signals that the user has manually edited the input value
  const isDirty = useRef(false);
  const elementId = useUniqueId(id, "hvSlider");
  // miscellaneous state
  const hasLabel = label != null;
  // validation related state
  const { arrayStatus, arrayDefaultStatus } = useMemo(
    () => convertStatusToArray(status, knobsPositions.length),
    [knobsPositions.length, status]
  );
  const [validationStatus, setValidationState] = useControlled(arrayStatus, arrayDefaultStatus);
  const [validationMessage, setValidationMessage] = useControlled(statusMessage, "");
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) || (status === undefined && required));

  const knobProperties = generateDefaultKnobProperties(
    knobPropertiesProp,
    knobsPositions.length,
    disabled,
    theme
  );
  const trackStyles = createTrackStyles(knobProperties, styles);
  const knobStyles = createKnobStyles(knobProperties, styles);
  const marks = useMemo(
    () =>
      createMark(
        markProperties,
        markStep,
        divisionQuantity,
        minPointValue,
        stepValue,
        markDigits,
        formatMark,
        disabled,
        styles
      ),
    [
      disabled,
      divisionQuantity,
      formatMark,
      markDigits,
      markProperties,
      markStep,
      minPointValue,
      stepValue,
      styles,
    ]
  );

  const rangesCount = knobProperties.length - 1;

  const performValidation = useCallback(() => {
    let invalid = false;
    const newValidationState = knobsPositions.map((position) => {
      if (position == null || Number.isNaN(position)) {
        invalid = true;
        return validationStates.invalid;
      }
      return validationStates.valid;
    });
    setValidationState([...newValidationState]);
    if (invalid) {
      setValidationMessage(requiredMessage);
      return;
    }
    setValidationMessage("");
  }, [knobsPositions, requiredMessage, setValidationMessage, setValidationState]);

  useEffect(() => {
    const stepVl = calculateStepValue(maxPointValue, minPointValue, divisionQuantity);
    const inverseStepVl = 1 / stepVl;
    if (valuesProp?.length > 0) {
      setKnobsPositions(
        knobsValuesToKnobsPositions(
          valuesProp.length > 0 ? valuesProp : defaultValues,
          inverseStepVl,
          minPointValue
        )
      );
    }
  }, [
    defaultValues,
    divisionQuantity,
    maxPointValue,
    minPointValue,
    setKnobsPositions,
    valuesProp,
  ]);

  useEffect(() => {
    if (!isDirty.current) {
      // skip validation if currently focused or if empty and
      // the user never manually edited the input value
      return;
    }
    performValidation(knobsPositions, requiredMessage);
  }, [knobsPositions, requiredMessage, performValidation]);

  /**
   * Generates an object which posses the current value and position of the knobs.
   *
   * @param {Array} knobsCurrentPosition - An array containing the current positions of the knobs.
   * @returns {Object} - An object with the positions and values of the knobs.
   * @memberof HvSlider
   */
  const generateKnobsPositionAndValues = (knobsCurrentPosition) => {
    const newKnobsPosition = knobsCurrentPosition.slice();
    const knobsValues = [];

    let duplicatedValue = null;

    const findDuplicated = newKnobsPosition.filter(
      (item, index) => newKnobsPosition.indexOf(item) !== index
    );

    if (noOverlap && findDuplicated.length > 0) {
      [duplicatedValue] = findDuplicated;
    }
    newKnobsPosition.forEach((position, index, array) => {
      const newArray = array;
      let newPosition = position;

      if (noOverlap && newPosition === duplicatedValue) {
        const previousValue = knobsPositions[index];
        if (previousValue !== newPosition) {
          newPosition += newPosition > previousValue ? -1 : 1;
          newArray[index] = newPosition;
        }
      }

      knobsValues[index] = knobsPositionToScaledValue(newPosition, minPointValue, stepValue);
    }, this);

    return {
      knobsPosition: newKnobsPosition,
      knobsValues,
    };
  };

  /**
   * Function executed while the knobs changes.
   *
   * executes the callback provided by the user with the values and position of the knobs,
   * also lock the value of the knob in case one is fixed.
   *
   * @param {Array} knobsPosition - An array containing the current positions of the knobs.
   * @memberof HvSlider
   */
  const onChangeHandler = (knobsPosition) => {
    isDirty.current = true;
    const knobs = generateKnobsPositionAndValues(knobsPosition);
    knobProperties.forEach((knobProperty, index) => {
      if (knobProperty.fixed) {
        knobs.knobsPosition[index] = scaledValueToKnobsPositionValue(
          defaultValues[index],
          minPointValue,
          inverseStepValue
        );
      }
    });
    if (disabled || readOnly) return;
    onChange?.(knobs.knobsValues);
    setKnobsPositions(knobs.knobsPosition);
  };

  const onInputChangeHandler = (inputValues, index) => {
    let newKnobPositions = knobsValuesToKnobsPositions(
      inputValues,
      inverseStepValue,
      minPointValue
    );
    newKnobPositions = ensureValuesConsistency(newKnobPositions, index);
    onChangeHandler(newKnobPositions);
  };

  /**
   * Function executed before a change.
   *
   * executes the callback provided by the user with the values and position of the knobs
   *
   * @param {Array} knobsPosition - An array containing the current positions of the knobs.
   * @memberof HvSlider
   */
  const onBeforeChangeHandler = (knobsPosition) => {
    const knobs = generateKnobsPositionAndValues(knobsPosition);
    onBeforeChange?.(knobs.knobsValues);
  };

  /**
   * Function executed after a change.
   *
   * executes the callback provided by the user with the values and position of the knobs
   *
   * @param {Array} knobsPosition - An array containing the current positions of the knobs.
   * @memberof HvSlider
   */
  const onAfterChangeHandler = (knobsPosition) => {
    const knobs = generateKnobsPositionAndValues(knobsPosition);
    onAfterChange?.(knobs.knobsValues);
  };

  const onMouseDownHandler = (event) => {
    if (event.target.className.includes("track")) {
      setIsDraggingTrack(true);
    }
  };

  const onMouseUpHandler = () => {
    setIsDraggingTrack(false);
  };

  const onBlurHandler = (event) => {
    const knobs = generateKnobsPositionAndValues(knobsPositions);
    performValidation(knobsPositions, requiredMessage);
    onBlur?.(event, knobs.knobsValues, status);
  };
  const sliderInputId = setId(elementId, "input");
  /**
   * Function used to create a custom knob for the slider.
   *
   * TODO: This should be isolated because is creating a sub component,
   * but there were some problems regarding the underlying component losing
   * references of the handlers disabling the focus.
   *
   * @param {Object} props - An object containing the properties of the knobs.
   * @memberof HvSlider
   */
  const createKnob = (knobNode, params) => {
    const { value: knobValue, dragging, index } = params;
    const { className: knobClassName, style, ...restProps } = knobNode.props;
    const scaledKnobValue = knobsPositionToScaledValue(knobValue, minPointValue, stepValue).toFixed(
      markDigits
    );
    if (dragging) {
      style.backgroundColor = knobProperties[index].dragColor;
    } else {
      style.backgroundColor = knobProperties[index].color;
    }

    const isEmpty = Number.isNaN(knobsPositions[index]) || knobsPositions[index] == null;
    const handleId = setId(elementId, "knob");
    const indexedHandleId = setId(handleId, index);
    return (
      <div
        key={index}
        className={clsx({
          [classes.handleContainer]: !disabled && !isEmpty,
          [classes.handleContainerDisabled]: disabled && !isEmpty,
          [classes.handleHiddenContainer]: isEmpty || readOnly,
        })}
      >
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={formatTooltip?.(scaledKnobValue) || scaledKnobValue}
          visible={dragging}
          placement="top"
          overlayClassName={classes.sliderTooltip}
          getTooltipContainer={() => document.getElementById(indexedHandleId)}
        >
          <div
            id={indexedHandleId}
            style={style}
            className={clsx(knobClassName, classes.handle)}
            {...restProps}
            aria-label={`${label}-knob-${index}`}
            aria-valuenow={knobsPositionToScaledValue(knobValue, minPointValue, stepValue)}
            aria-valuemin={minPointValue}
            aria-valuemax={maxPointValue}
            {...knobProps?.[index]}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <HvFormElement
      className={clsx(className, classes.root, {
        [classes.trackDragging]: !readOnly && !disabled && !isSingle && isDraggingTrack,
        [classes.trackStandBy]: !readOnly && !disabled && !isSingle && !isDraggingTrack,
        [classes.rootDisabled]: disabled,
      })}
      id={id}
      name={name}
      status={statusArrayToFormStatus(validationStatus)}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      onBlur={onBlurHandler}
      {...others}
    >
      {(hasLabel || !hideInput) && (
        <div
          className={clsx(classes.labelContainer, {
            [classes.labelIncluded]: hasLabel,
            [classes.onlyInput]: !hasLabel,
          })}
        >
          {hasLabel && (
            <HvLabel
              id={setId(elementId, "label")}
              className={classes.label}
              htmlFor={setId(elementId, "slider")}
              label={label}
            />
          )}

          {!hideInput && (
            <SliderInput
              id={sliderInputId}
              label={label}
              values={knobsPositionsToKnobsValues(knobsPositions, stepValue, minPointValue)}
              onChange={onInputChangeHandler}
              status={validationStatus}
              disabled={disabled}
              readOnly={readOnly}
              markDigits={markDigits}
              inputProps={inputProps}
            />
          )}
        </div>
      )}
      <div className={classes.sliderContainer}>
        {isSingle && (
          <Slider
            id={setId(elementId, "slider")}
            handleRender={createKnob}
            className={clsx(classes.sliderRoot)}
            min={0}
            max={divisionQuantity}
            step={1}
            marks={marks}
            dotStyle={disabled ? styles.dotDisabled : styles.dot}
            onChange={(singleValue) => onChangeHandler([singleValue])}
            onBeforeChange={(singleValue) => onBeforeChangeHandler([singleValue])}
            onAfterChange={(singleValue) => onAfterChangeHandler([singleValue])}
            value={knobsPositions.length > 0 ? knobsPositions[0] : undefined}
            allowCross={false}
            disabled={disabled}
            count={rangesCount}
            railStyle={styles.rail}
            handleStyle={knobStyles.knobInner}
            trackStyle={trackStyles}
            {...sliderProps}
          />
        )}
        {!isSingle && (
          <Slider
            id={setId(elementId, "slider")}
            range
            handleRender={createKnob}
            className={clsx(classes.sliderRoot, { [classes.rootRange]: !isSingle })}
            min={0}
            max={divisionQuantity}
            step={1}
            marks={marks}
            disabled={disabled}
            dotStyle={disabled ? styles.dotDisabled : styles.dot}
            onChange={onChangeHandler}
            onBeforeChange={onBeforeChangeHandler}
            onAfterChange={onAfterChangeHandler}
            value={knobsPositions.length > 0 ? [...knobsPositions] : undefined}
            allowCross={false}
            count={rangesCount}
            railStyle={styles.rail}
            handleStyle={knobStyles.knobInner}
            trackStyle={trackStyles}
            draggableTrack={!readOnly && !isSingle}
            {...sliderProps}
          />
        )}
      </div>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} className={classes.error} disableBorder>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvSlider.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the slider root node.
   */
  id: PropTypes.string,
  /**
   * The slider name.
   */
  name: PropTypes.string,
  /**
   * The label of the slider.
   *
   * If not provided, an aria-label or aria-labelledby must be inputted via sliderProps.
   */
  label: PropTypes.node,
  /**
   * Indicates that the slider is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the slider is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that user slider is required on the form element.
   */
  required: PropTypes.bool,
  /**
   * What message to render when the value is required.
   */
  requiredMessage: PropTypes.string,
  /**
   * if `true` the input that controls the slider is hidden.
   */
  hideInput: PropTypes.bool,
  /**
   * Attributes applied to the slider element.
   */
  sliderProps: PropTypes.instanceOf(Object),
  /**
   * The status of the slider.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to `checked`, depending of the values of both `required` and `checked`.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage: PropTypes.string,
  /**
   * The values array to apply to the component
   */
  values: PropTypes.arrayOf(PropTypes.number),
  /**
   * The default values array to apply to the component
   */
  defaultValues: PropTypes.arrayOf(PropTypes.number),
  /**
   * The object used to set the knob properties,
   * for every item in the array a new knob will be created.
   */
  knobProperties: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      hoverColor: PropTypes.string,
      trackColor: PropTypes.string,
      dragColor: PropTypes.string,
      knobRingColor: PropTypes.string,
      defaultValue: PropTypes.number,
      hidden: PropTypes.bool,
      fixed: PropTypes.bool,
    })
  ),
  /**
   * The object used to set the mark properties individually.
   */
  markProperties: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.number,
      label: PropTypes.string,
    })
  ),
  /**
   * the function executed before a change will occur in the slider.
   */
  onBeforeChange: PropTypes.func,
  /**
   * the function executed while a change is occurring in the slider.
   */
  onChange: PropTypes.func,
  /**
   * the function executed after a change ocurred in the slider.
   */
  onAfterChange: PropTypes.func,
  /**
   * the function executed after a blur ocurred in the slider.
   */
  onBlur: PropTypes.func,
  /**
   * the separation in points between marks.
   * example: if 10 divisions and a markstep of 2 there will be 5 marks.
   */
  markStep: PropTypes.number,
  /**
   * how many subdivisions there are in the slider.
   */
  divisionQuantity: PropTypes.number,
  /**
   * the value of the first point in the slider from left to right.
   */
  minPointValue: PropTypes.number,
  /**
   * the value of the last point in the slider from left to right.
   */
  maxPointValue: PropTypes.number,
  /**
   * the max number of decimals if no format function is applied
   */
  markDigits: PropTypes.number,
  /**
   * a formatting function used to add format to the marks in the track,
   * the function receives the mark text
   */
  formatMark: PropTypes.func,
  /**
   * a formatting function used to add format to the tooltip in the track,
   * the function receives the mark text
   */
  formatTooltip: PropTypes.func,
  /**
   * if `true` the knobs can't have the same value, if `false` knobs can have the same value.
   */
  noOverlap: PropTypes.bool,
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the root of the component when in range mode.
     */
    rootRange: PropTypes.string,
    /**
     * Style applied to the container holding the label.
     */
    labelContainer: PropTypes.string,
    /**
     * Style applied to the label.
     */
    label: PropTypes.string,
    /**
     * Style applied to the knob.
     */
    handle: PropTypes.string,
    /**
     * Style applied to the container that has the knob used to move.
     */
    handleContainer: PropTypes.string,
    /**
     * Style applied to the div where the slider is placed.
     */
    sliderRoot: PropTypes.string,
    /**
     * Style applied when the user is dragging the range track.
     */
    trackDragging: PropTypes.string,
    /**
     * Style applied when root container is disabled.
     */
    rootDisabled: PropTypes.string,
    /**
     * Style applied when the user is not dragging the range track.
     */
    trackStandBy: PropTypes.string,
    /**
     * Style applied to the warning container.
     */
    error: PropTypes.string,
    /**
     * Style applied to the handle container when it is hidden.
     */
    handleHiddenContainer: PropTypes.string,
    /**
     * Style applied to the handle container when it is disabled.
     */
    handleContainerDisabled: PropTypes.string,
    /**
     * Style applied when the label element is present.
     */
    labelIncluded: PropTypes.string,
    /**
     * Style applied when only the input element is present.
     */
    onlyInput: PropTypes.string,
    /**
     * Style applied to the dot.
     */
    dot: PropTypes.string,
    /**
     * Style applied to the rail.
     */
    rail: PropTypes.string,
    /**
     * Style applied to the inner of the knob.
     */
    knobInner: PropTypes.string,
    /**
     * Style applied to the outside of the knob.
     */
    knobOuter: PropTypes.string,
    /**
     * Style applied when the knob is hidden.
     */
    knobHidden: PropTypes.string,
    /**
     * Style applied  last hidden knob.
     */
    knobHiddenLast: PropTypes.string,
    /**
     * Style applied to the track.
     */
    track: PropTypes.string,
    /**
     * Style applied to the mark.
     */
    mark: PropTypes.string,
    /**
     * Style applied to the tooltip.
     */
    sliderTooltip: PropTypes.string,
    /**
     * Style applied to the container of the tooltip.
     */
    sliderContainer: PropTypes.string,
  }).isRequired,
  /**
   * Identifies the element that provides an error message for the slider.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  /**
   * Attributes applied to the input element.
   */
  knobProps: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  /**
   * Theme object required to style the slider.
   */
  theme: PropTypes.any.isRequired,
};

export default withStyles(styleCreator, { name: "HvSlider", withTheme: true })(HvSlider);
