import { memo, useCallback, useState } from "react";
import uniqueId from "lodash/uniqueId";
import isEmpty from "lodash/isEmpty";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { HvInput } from "@core/components/Input";

import { useQueryBuilderContext } from "../../../Context";
import { useClasses } from "./Numeric.styles";
import { HvQueryBuilderNumericRange } from "../../../types";

export interface NumericValueProps {
  id: React.Key;
  value?: any;
  operator?: string;
  initialTouched?: boolean;
}

export const NumericValue = ({
  id,
  value,
  operator,
  initialTouched = false,
}: NumericValueProps) => {
  const { classes, cx } = useClasses();

  const isRange = operator === "range";
  const { labels, dispatchAction, readOnly } = useQueryBuilderContext();

  const theme = useTheme();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const onSingleValueChange = useCallback(
    (_, data: string) => {
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
    (_, data: string, from = true) => {
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

  let numericValidation: "required" | "invalid" | null = null;
  let rightValidation: "required" | "invalid" | "greaterThan" | "equal" | null =
    null;

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
      if (
        rangeValue?.from === undefined ||
        rangeValue?.from?.toString() === ""
      ) {
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

  const renderRangeInputs = (rangeValue: HvQueryBuilderNumericRange) => (
    <div
      className={cx(classes.rangeContainer, { [classes.isMdDown]: isMdDown })}
    >
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
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          status={!touchedNumeric ? "standBy" : numericStatus}
          statusMessage={
            numericValidation
              ? labels.rule.value.numeric.validation[numericValidation]
              : ""
          }
          required
          inputProps={{
            autoComplete: "off",
          }}
          placeholder={labels.rule.value.numeric.placeholder}
          readOnly={readOnly}
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
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          status={!touchedNumericTo ? "standBy" : rightStatus}
          statusMessage={
            rightValidation
              ? labels.rule.value.numeric.validation[rightValidation]
              : ""
          }
          required
          inputProps={{
            autoComplete: "off",
          }}
          placeholder={labels.rule.value.numeric.placeholder}
          readOnly={readOnly}
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
            value={value?.toString() || ""}
            onChange={onSingleValueChange}
            onBlur={() => {
              setTouchedNumeric(true);
            }}
            onKeyDown={(e: any) => {
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
            statusMessage={
              numericValidation
                ? labels.rule.value.numeric.validation[numericValidation]
                : ""
            }
            readOnly={readOnly}
          />
        </div>
      )}
    </div>
  );
};

export default memo(NumericValue);
