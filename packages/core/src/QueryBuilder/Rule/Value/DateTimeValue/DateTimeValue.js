import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import dayjs from "dayjs";
import clsx from "clsx";

import { HvDatePicker, HvWarningText, HvTimePicker } from "../../../..";
import Context from "../../../Context";
import { padTime, parseDate, parseTime } from "./utils";

import useStyles from "./styles";

function valueIsRange(operator) {
  return operator === "range";
}

const DateTimeValue = ({ id, operator, value: valueProp = {}, initialTouched = false }) => {
  const classes = useStyles();

  const isRange = valueIsRange(operator, valueProp);

  const context = React.useContext(Context);
  const { labels, dispatchAction, readOnly } = context;

  const elementId = uniqueId(`datetime${id}`);

  const [touchedDate, setTouchedDate] = useState(initialTouched);
  const [touchedTime, setTouchedTime] = useState(initialTouched);
  const [touchedEndDate, setTouchedEndDate] = useState(initialTouched);
  const [touchedEndTime, setTouchedEndTime] = useState(initialTouched);

  const onDateChange = useCallback(
    (data) => {
      setTouchedDate(true);

      let date;
      if (data != null) {
        date = dayjs(data).format("YYYY-MM-DD");
      }

      const oldValue = !isRange ? valueProp?.date : valueProp?.start?.date;

      if (date !== oldValue) {
        let value;
        if (!isRange) {
          value = {
            date,
            time: valueProp?.time,
          };
        } else {
          value = {
            start: {
              date,
              time: valueProp?.start?.time,
            },
            end: valueProp?.end,
          };
        }

        dispatchAction({
          type: "set-value",
          id,
          value,
        });
      }
    },
    [dispatchAction, id, isRange, valueProp]
  );

  const onTimeChange = useCallback(
    (data) => {
      setTouchedTime(true);

      let time;
      if (data != null) {
        time = `${padTime(data.hours)}:${padTime(data.minutes)}:${padTime(data.seconds)}`;
      }

      const oldValue = !isRange ? valueProp?.time : valueProp?.start?.time;

      if (time !== oldValue) {
        let value;
        if (!isRange) {
          value = {
            date: valueProp?.date,
            time,
          };
        } else {
          value = {
            start: {
              date: valueProp?.start?.date,
              time,
            },
            end: valueProp?.end,
          };
        }

        dispatchAction({
          type: "set-value",
          id,
          value,
        });
      }
    },
    [dispatchAction, id, isRange, valueProp]
  );

  const onEndDateChange = useCallback(
    (data) => {
      setTouchedEndDate(true);

      let date;
      if (data != null) {
        date = dayjs(data).format("YYYY-MM-DD");
      }

      if (date !== valueProp?.end?.date) {
        const value = {
          start: valueProp?.start,
          end: {
            date,
            time: valueProp?.end?.time,
          },
        };

        dispatchAction({
          type: "set-value",
          id,
          value,
        });
      }
    },
    [dispatchAction, id, valueProp]
  );

  const onEndTimeChange = useCallback(
    (data) => {
      setTouchedEndTime(true);

      let time;
      if (data != null) {
        time = `${padTime(data.hours)}:${padTime(data.minutes)}:${padTime(data.seconds)}`;
      }

      if (time !== valueProp?.end?.time) {
        const value = {
          start: valueProp?.start,
          end: {
            date: valueProp?.end?.date,
            time,
          },
        };

        dispatchAction({
          type: "set-value",
          id,
          value,
        });
      }
    },
    [dispatchAction, id, valueProp]
  );

  const startDate = isRange ? valueProp?.start?.date : valueProp?.date;
  const datePickerValue = useMemo(() => parseDate(startDate), [startDate]);
  const datePickerStatus = datePickerValue != null ? "valid" : "invalid";

  const startTime = (isRange ? valueProp?.start?.time : valueProp?.time) ?? "";
  const timePickerValue = useMemo(() => parseTime(startTime), [startTime]);
  const timePickerStatus = timePickerValue != null ? "valid" : "invalid";

  const endDate = isRange ? valueProp?.end?.date : null;
  const endDatePickerValue = useMemo(() => parseDate(endDate), [endDate]);

  const endTime = isRange ? valueProp?.end?.time : null;
  const endTimePickerValue = useMemo(() => parseTime(endTime), [endTime]);

  const dateStatus = !touchedDate ? "standBy" : datePickerStatus;
  const timeStatus = !touchedTime ? "standBy" : timePickerStatus;

  const endDateIsBefore = startDate != null && endDate != null && endDate < startDate;

  const endTimeIsBeforeOrSame =
    startDate != null &&
    endDate != null &&
    endDate === startDate &&
    startTime != null &&
    endTime != null &&
    endTime <= startTime;

  const endDateTimeIsBefore = endDateIsBefore || endTimeIsBeforeOrSame;

  const endDatePickerStatus =
    endDatePickerValue == null || endDateTimeIsBefore ? "invalid" : "valid";
  const endDateStatus = !touchedEndDate ? "standBy" : endDatePickerStatus;

  const endTimePickerStatus =
    endTimePickerValue == null || endDateTimeIsBefore ? "invalid" : "valid";
  const endTimeStatus = !touchedEndTime ? "standBy" : endTimePickerStatus;

  return (
    <div className={classes.root}>
      <div className={clsx(classes.row, classes.horizontal)}>
        <HvDatePicker
          className={classes.datePicker}
          name={`${elementId}-date`}
          required
          status={dateStatus}
          statusMessage={labels.rule.value.datetime.validation.required}
          label={
            isRange
              ? labels.rule.value.datetime.startDateLabel
              : labels.rule.value.datetime.dateLabel
          }
          placeholder={
            isRange
              ? labels.rule.value.datetime.startDatePlaceholder
              : labels.rule.value.datetime.datePlaceholder
          }
          value={datePickerValue}
          onChange={onDateChange}
          readOnly={readOnly}
        />
        <HvTimePicker
          className={classes.timePicker}
          timeFormat="24"
          name={`${elementId}-time`}
          disableDefaultValue
          required
          status={timeStatus}
          statusMessage={labels.rule.value.datetime.validation.required}
          label={
            isRange
              ? labels.rule.value.datetime.startTimeLabel
              : labels.rule.value.datetime.timeLabel
          }
          placeholder={
            isRange
              ? labels.rule.value.datetime.startTimePlaceholder
              : labels.rule.value.datetime.timePlaceholder
          }
          value={timePickerValue}
          onChange={onTimeChange}
          onToggle={(_evt, open) => {
            if (!open && !touchedTime) {
              setTouchedTime(true);
            }
          }}
          readOnly={readOnly}
        />
      </div>
      {isRange && (
        <div className={clsx(classes.row, classes.vertical)}>
          <div className={classes.horizontal}>
            <HvDatePicker
              className={classes.datePicker}
              name={`${elementId}-endDate`}
              required
              status={endDateStatus}
              statusMessage={labels.rule.value.datetime.validation.required}
              aria-errormessage={endDateTimeIsBefore ? `${elementId}-combined-error` : undefined}
              label={labels.rule.value.datetime.endDateLabel}
              placeholder={labels.rule.value.datetime.endDatePlaceholder}
              value={endDatePickerValue}
              onChange={onEndDateChange}
              readOnly={readOnly}
            />
            <HvTimePicker
              className={classes.timePicker}
              timeFormat="24"
              name={`${elementId}-endTime`}
              disableDefaultValue
              required
              status={endTimeStatus}
              statusMessage={labels.rule.value.datetime.validation.required}
              aria-errormessage={endDateTimeIsBefore ? `${elementId}-combined-error` : undefined}
              label={labels.rule.value.datetime.endTimeLabel}
              placeholder={labels.rule.value.datetime.endTimePlaceholder}
              value={endTimePickerValue}
              onChange={onEndTimeChange}
              onToggle={(_evt, open) => {
                if (!open && !touchedEndTime) {
                  setTouchedEndTime(true);
                }
              }}
              readOnly={readOnly}
            />
          </div>
          <HvWarningText
            disableBorder
            id={`${elementId}-combined-error`}
            isVisible={endDateTimeIsBefore}
          >
            {labels.rule.value.datetime.validation.invalidInterval}
          </HvWarningText>
        </div>
      )}
    </div>
  );
};

DateTimeValue.propTypes = {
  id: PropTypes.number,
  operator: PropTypes.string,
  value: PropTypes.any,
  initialTouched: PropTypes.bool,
};

export default React.memo(DateTimeValue);
