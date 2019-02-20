/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/**
 * Note: https://github.com/react-component/slider/issues/504
 * Version must remain in "8.6.3" until this bug is fixed
 */

import React from "react";
import PropTypes from "prop-types";
import { Range, Handle } from "rc-slider";
import Tooltip from "rc-tooltip";
import styleCreator from "./styles";
import KnobRing from "./KnobRing";
import "rc-slider/assets/index.css";

class HvSlider extends React.Component {
  constructor(props) {
    super(props);

    const {
      markProperties,
      markStep,
      markDigits,
      knobProperties,
      theme,
      maxPointValue,
      minPointValue,
      divisionQuantity,
      formatMark
    } = props;

    const styles = styleCreator(theme);
    const stepValue = this.calculateStepValue(
      maxPointValue,
      minPointValue,
      divisionQuantity
    );
    const inverseStepValue = 1 / stepValue;

    this.state = {
      knobsPosition: this.transformDefaultKnobsPosition(
        knobProperties,
        inverseStepValue,
        minPointValue
      ),
      trackStyles: this.createTrackStyles(knobProperties, styles),
      knobStyles: this.createKnobStyles(knobProperties, styles, false),
      rangesCount: knobProperties.length - 1,
      marks: this.createMark(
        markProperties,
        markStep,
        divisionQuantity,
        minPointValue,
        stepValue,
        markDigits,
        formatMark,
        styles
      ),
      defaultKnobsPositions: this.transformDefaultKnobsPosition(
        knobProperties,
        inverseStepValue,
        minPointValue
      ),
      styles,
      stepValue,
      inverseStepValue
    };
  }

  /**
   * Calculates the separation between each value in the slider.
   *
   * @param {*} maxPointValue - The value of the last point in the slider from left to right.
   * @param {*} minPointValue - The value of the first point in the slider from left to right.
   * @param {*} divisionQuantity - How many subdivisions there are in the slider.
   */
  calculateStepValue = (maxPointValue, minPointValue, divisionQuantity) =>
    Math.abs(maxPointValue - minPointValue) / divisionQuantity;

  /**
   * Transform the scaled values into knobs positions.
   *
   * @param {*} sliderValue - the value of the slider to be scaled
   * @param {*} minPointValue - The value of the first point in the slider from left to right.
   * @param {*} stepValue - The calculated separation between the values of the slider.
   */
  knobsPositionToScaledValue = (sliderValue, minPointValue, stepValue) =>
    minPointValue + stepValue * sliderValue;

  /**
   * Transform the scaled values into knobs positions.
   *
   * @param {*} scaledValue - the value of the slider to be scaled
   * @param {*} minPointValue - The value of the first point in
   * the slider from left to right.
   * @param {*} inverseStepValue - The inverse of calculated separation between
   * the value of the points that compose the slider.
   */
  scaledValueToKnobsPositionValue = (
    scaledValue,
    minPointValue,
    inverseStepValue
  ) => Math.floor((scaledValue - minPointValue) * inverseStepValue);

  /**
   * Transform the received knobs values into knob positions
   *
   * @param {Object} knobProperties - The object provided by the user with the
   * desired configuration for the knobs.
   * @param {Number} inverseStepValue - The inverse of calculated separation between
   * the value of the points that compose the slider.
   * @param {Integer} minPointValue - The value of the first point in the slider from
   * left to right.
   * @returns {Array} - The position of the knobs.
   */
  transformDefaultKnobsPosition = (
    knobProperties,
    inverseStepValue,
    minPointValue
  ) => {
    const defaultKnobsPositions = [];
    knobProperties.forEach((knobProperty, index) => {
      defaultKnobsPositions[index] = this.scaledValueToKnobsPositionValue(
        knobProperty.defaultValue,
        minPointValue,
        inverseStepValue
      );
    });
    return defaultKnobsPositions;
  };

  /**
   * Generates the inline styles used for the track of each knob, applying colors if necessary.
   *
   * @param {Object} markProperties - The object provided by the user with
   * the desired configuration for the marks.
   * @param {Integer} markstep - The separation between marks.
   * @param {Integer} divisionQuantity - How many subdivisions there are in the slider.
   * @param {Integer} minPointValue - The value of the first point in the slider from
   * left to right.
   * @param {Integer} stepValue - The calculated separation between the values of the slider.
   * @param {Integer} markDigits - How many decimals the mark will show.
   * @param {Function} formatMark - A function provided by the user that is going to
   * be executed to format the mark text.
   * @param {Object} styles - the default styles for the marks.
   * @returns {Object} - An object with the for the marks.
   * @memberof HvSlider
   */
  createMark = (
    markProperties,
    markstep,
    divisionQuantity,
    minPointValue,
    stepValue,
    markDigits,
    formatMark,
    styles
  ) => {
    const marks = {};
    if (markProperties.length > 0) {
      markProperties.forEach(markProperty => {
        marks[markProperty.position] = {
          label: `${markProperty.label}`,
          style: {
            ...styles.mark
          }
        };
      });
    } else {
      const roundedMarkStep = Math.floor(markstep);
      for (let index = 0; index <= divisionQuantity; index += roundedMarkStep) {
        let labelValue = this.knobsPositionToScaledValue(
          index,
          minPointValue,
          stepValue
        ).toFixed(markDigits);
        labelValue = formatMark(labelValue);
        marks[index] = {
          label: `${labelValue}`,
          style: {
            ...styles.mark
          }
        };
      }
    }
    return marks;
  };

  /**
   * Generates the inline styles used for the track of each knob, applying colors if necessary.
   *
   * @param {Object} knobProperties - The object provided by the user with
   * the desired configuration for the knobs.
   * @param {Object} styles - the default styles for the tracks.
   * @returns {Object} - An object with the style for each track.
   * @memberof HvSlider
   */
  createTrackStyles = (knobProperties, styles) => {
    const trackStyles = [];
    if (knobProperties.length > 1) {
      knobProperties.forEach((knobProperty, index) => {
        trackStyles[index] = { ...styles.track };
        if (knobProperty.color) {
          trackStyles[index].backgroundColor = knobProperty.trackColor;
        }
      });
    }
    return trackStyles;
  };

  /**
   * Generates the inline styles used for each knob, applying colors if specified.
   *
   * @param {Object} knobProperties - The object provided by the user with
   * the desired configuration for the knobs.
   * @param {Object} styles - the default styles for the knobs.
   * @returns {Object} - An object with both the inner and outer styles for the knob.
   * @memberof HvSlider
   */
  createKnobStyles = (knobProperties, styles) => {
    const knobInner = [];
    const knobOuterStyle = [];

    const lastItem = knobProperties.length - 1;
    if (knobProperties.length > 1) {
      knobProperties.forEach((knobProperty, index) => {
        knobInner[index] = { ...styles.knobInner };
        knobOuterStyle[index] = { ...styles.knobOuter };

        if (knobProperty.color) {
          knobInner[index].backgroundColor = knobProperty.color;
          knobOuterStyle[index].backgroundColor = "transparent";
        }

        if (knobProperty.hidden) {
          knobInner[index] = styles.knobHidden;
          if (index === lastItem) {
            knobInner[index] = { ...styles.knobHiddenLast };
            knobInner[index].backgroundColor = knobProperty.color;
            knobOuterStyle[index] = { ...styles.knobHidden };
            knobOuterStyle[index].backgroundColor = knobProperty.color;
          }
        }
      });
    }

    return {
      knobInner,
      knobOuterStyle
    };
  };

  /**
   * Generates an object which posses the current value and position of the knobs.
   *
   * @param {Array} knobsCurrentPosition - An array containing the current positions of the knobs.
   * @returns {Object} - An object with the positions and values of the knobs.
   * @memberof HvSlider
   */
  generateKnobsPositionAndValues = knobsCurrentPosition => {
    const newKnobsPosition = knobsCurrentPosition.slice();
    const knobsValues = [];
    const { minPointValue, noOverlap } = this.props;
    const { stepValue, knobsPosition } = this.state;

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
        const previousValue = knobsPosition[index];
        if (previousValue !== newPosition) {
          newPosition += newPosition > previousValue ? -1 : 1;
          newArray[index] = newPosition;
        }
      }

      knobsValues[index] = this.knobsPositionToScaledValue(
        newPosition,
        minPointValue,
        stepValue
      );
    }, this);

    return {
      knobsPosition: newKnobsPosition,
      knobsValues
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
  onChangeHandler = knobsPosition => {
    const knobs = this.generateKnobsPositionAndValues(knobsPosition);
    const { knobProperties, onChange, minPointValue } = this.props;
    const { inverseStepValue } = this.state;
    knobProperties.forEach((knobProperty, index) => {
      if (knobProperty.fixed) {
        knobs.knobsPosition[index] = this.scaledValueToKnobsPositionValue(
          knobProperty.defaultValue,
          minPointValue,
          inverseStepValue
        );
      }
    });

    onChange(knobs);

    this.setState({
      knobsPosition: knobs.knobsPosition
    });
  };

  /**
   * Function executed before a change.
   *
   * executes the callback provided by the user with the values and position of the knobs
   *
   * @param {Array} knobsPosition - An array containing the current positions of the knobs.
   * @memberof HvSlider
   */
  onBeforeChangeHandler = knobsPosition => {
    const { onBeforeChange } = this.props;
    const knobs = this.generateKnobsPositionAndValues(knobsPosition);
    onBeforeChange(knobs);
  };

  /**
   * Function executed after a change.
   *
   * executes the callback provided by the user with the values and position of the knobs
   *
   * @param {Array} knobsPosition - An array containing the current positions of the knobs.
   * @memberof HvSlider
   */
  onAfterChangeHandler = knobsPosition => {
    const { onAfterChange } = this.props;
    const knobs = this.generateKnobsPositionAndValues(knobsPosition);
    onAfterChange(knobs);
  };

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
  createKnob = props => {
    const {
      minPointValue,
      markDigits,
      knobProperties,
      formatMark,
      classes
    } = this.props;
    const { stepValue } = this.state;
    const { value, dragging, index, style, ...restProps } = props;

    const knobValue = this.knobsPositionToScaledValue(
      value,
      minPointValue,
      stepValue
    ).toFixed(markDigits);
    if (dragging) {
      style.backgroundColor = knobProperties[index].dragColor;
    } else {
      style.backgroundColor = knobProperties[index].color;
    }

    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={formatMark(knobValue)}
        visible={dragging}
        placement="top"
        key={index}
        overlayClassName={classes.sliderTooltip}
      >
        <Handle value={value} style={style} {...restProps}>
          <KnobRing
            hoverColor={knobProperties[index].hoverColor}
            dragging={dragging}
          />
        </Handle>
      </Tooltip>
    );
  };

  render() {
    const { divisionQuantity, classes } = this.props;

    const {
      knobsPosition,
      defaultKnobsPositions,
      rangesCount,
      knobStyles,
      trackStyles,
      marks,
      styles
    } = this.state;

    return (
      <Range
        handle={this.createKnob}
        className={classes.root}
        min={0}
        max={divisionQuantity}
        step={1}
        marks={marks}
        dotStyle={styles.dot}
        onChange={this.onChangeHandler}
        onBeforeChange={this.onBeforeChangeHandler}
        onAfterChange={this.onAfterChangeHandler}
        value={knobsPosition}
        allowCross={false}
        defaultValue={defaultKnobsPositions}
        count={rangesCount}
        railStyle={styles.rail}
        handleStyle={knobStyles.knobInner}
        trackStyle={trackStyles}
      />
    );
  }
}

HvSlider.propTypes = {
  /**
   * The object created by material to apply to the component.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * The object used to set the knob properties,
   * for every item in the array a new knob will be created.
   */
  knobProperties: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      defaultValue: PropTypes.number,
      hidden: PropTypes.bool,
      fixed: PropTypes.bool,
      hoverColor: PropTypes.string
    })
  ).isRequired,
  /**
   * The object used to set the mark properties individually.
   */
  markProperties: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.number,
      label: PropTypes.string
    })
  ),
  /**
   * the function executed before a change will ocurr in the slider.
   * it will receive an object like
   * {
   *   knobsPosition: [],
   *   knobsValues: []
   * }
   */
  onBeforeChange: PropTypes.func,
  /**
   * the function executed while a change is ocurring in the slider.
   * it will receive an object like
   * {
   *   knobsPosition: [],
   *   knobsValues: []
   * }
   */
  onChange: PropTypes.func,
  /**
   * the function executed after a change ocurred in the slider.
   * it will receive an object like
   * {
   *   knobsPosition: [],
   *   knobsValues: []
   * }
   */
  onAfterChange: PropTypes.func,
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
   * a formatting function used to add format to the marks in the track,
   * the function receives the
   */
  markDigits: PropTypes.number,
  /**
   * a formatting function used to add format to the marks in the track,
   * the function receives the
   */
  formatMark: PropTypes.func,
  /**
   * if `true` the knobs can't have the same value, if `false` knobs can have the same value.
   */
  noOverlap: PropTypes.bool,
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.instanceOf(Object).isRequired
};

HvSlider.defaultProps = {
  markStep: 1,
  markDigits: 0,
  noOverlap: true,
  formatMark: mark => mark,
  markProperties: [],
  divisionQuantity: 100,
  minPointValue: 0,
  maxPointValue: 100,
  onBeforeChange: () => {},
  onChange: () => {},
  onAfterChange: () => {}
};

export default HvSlider;
