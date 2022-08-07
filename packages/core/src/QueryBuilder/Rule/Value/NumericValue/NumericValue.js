import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import isEmpty from "lodash/isEmpty";

import { HvInput } from "../../../..";
import Context from "../../../Context";
import useStyles from "./styles";

const NumericValue = ({ id, value, operator, initialTouched = false }) => {
  const classes = useStyles();
  const isRange = operator === "range";
  const context = React.useContext(Context);
  const { labels, dispatchAction } = context;

  const onSingleValueChange = useCallback(
    (evt, data) => {
      const numericData = isEmpty(data) ? null : Number(data);
      dispatchAction({
        type: "set-value",
        id,
        value: Number.isNaN(numericData) ? data : numericData,
      });
    },
    [dispatchAction, id]
  );

  const onRangeValueChange = useCallback(
    (evt, data, from = true) => {
      const numericData = isEmpty(data) ? null : Number(data);
      const currentValue = value;
      const numericRange = {
        from: currentValue?.from,
        to: currentValue?.to,
      };
      if (from) {
        numericRange.from = Number.isNaN(numericData) ? data : numericData;
      } else {
        numericRange.to = Number.isNaN(numericData) ? data : numericData;
      }
      dispatchAction({
        type: "set-value",
        id,
        value: numericRange,
      });
    },
    [dispatchAction, id, value]
  );

  const [touchedNumeric, setTouchedNumeric] = useState(initialTouched);
  const [touchedNumericTo, setTouchedNumericTo] = useState(initialTouched);

  const elementId = uniqueId("numeric");

  let numericValidation = null;
  let rightValidation = null;

  if (touchedNumeric || touchedNumericTo) {
    if (value === undefined || value?.toString() === "") {
      if (touchedNumeric) {
        numericValidation = "required";
      }
      if (touchedNumericTo) {
        rightValidation = "required";
      }
    } else if (!isRange) {
      if (Number.isNaN(Number(value))) {
        numericValidation = "invalid";
      }
    } else if (isRange) {
      const rangeValue = value;
      if (rangeValue?.from === undefined || rangeValue?.from?.toString() === "") {
        numericValidation = "required";
      } else if (Number.isNaN(Number(rangeValue?.from))) {
        numericValidation = "invalid";
      }

      if (rangeValue?.to === undefined || rangeValue?.to?.toString() === "") {
        rightValidation = "required";
      } else if (Number.isNaN(Number(rangeValue?.to))) {
        rightValidation = "invalid";
      } else if (Number(rangeValue?.from) > Number(rangeValue?.to)) {
        rightValidation = "greaterThan";
      } else if (Number(rangeValue?.from) === Number(rangeValue?.to)) {
        rightValidation = "equal";
      }
    }
  }

  const numericStatus = numericValidation != null ? "invalid" : "valid";
  const rightStatus = rightValidation != null ? "invalid" : "valid";

  const renderRangeInputs = (rangeValue) => (
    <div className={classes.rangeContainer}>
      <div className={classes.inputContainer}>
        <HvInput
          label={labels.rule.value.numeric.range.leftLabel}
          className={classes.input}
          id={`${elementId}-numeric-from`}
          name={`${elementId}-numeric-from`}
          value={rangeValue?.from?.toString() || ""}
          onChange={(event, data) => onRangeValueChange(event, data)}
          onBlur={() => {
            setTouchedNumeric(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          status={!touchedNumeric ? "standBy" : numericStatus}
          statusMessage={labels.rule.value.numeric.validation[numericValidation] || ""}
          required
          inputProps={{
            autoComplete: "off",
          }}
          placeholder={labels.rule.value.numeric.placeholder}
        />
      </div>
      <div className={classes.inputContainer}>
        <HvInput
          label={labels.rule.value.numeric.range.rightLabel}
          className={classes.input}
          id={`${elementId}-numeric-to`}
          name={`${elementId}-numeric-to`}
          value={rangeValue?.to?.toString() || ""}
          onChange={(event, data) => onRangeValueChange(event, data, false)}
          onBlur={() => {
            setTouchedNumericTo(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          status={!touchedNumericTo ? "standBy" : rightStatus}
          statusMessage={labels.rule.value.numeric.validation[rightValidation] || ""}
          required
          inputProps={{
            autoComplete: "off",
          }}
          placeholder={labels.rule.value.numeric.placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      {isRange && renderRangeInputs(value || {})}
      {!isRange && (
        <div className={classes.inputContainer}>
          <HvInput
            label={labels.rule.value.numeric.label}
            className={classes.input}
            id={`${elementId}-numeric`}
            name={`${elementId}-numeric`}
            value={value ? value.toString() : ""}
            onChange={onSingleValueChange}
            onBlur={() => {
              setTouchedNumeric(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            status={!touchedNumeric ? "standBy" : numericStatus}
            required
            inputProps={{
              autoComplete: "off",
            }}
            placeholder={labels.rule.value.numeric.placeholder}
            statusMessage={labels.rule.value.numeric.validation[numericValidation] || ""}
          />
        </div>
      )}
    </div>
  );
};

NumericValue.propTypes = {
  id: PropTypes.number,
  value: PropTypes.any,
  operator: PropTypes.string,
  initialTouched: PropTypes.bool,
};

export default React.memo(NumericValue);
