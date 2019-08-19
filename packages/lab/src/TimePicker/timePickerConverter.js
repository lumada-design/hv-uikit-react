/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TimeFormat, PeriodPickerOptions, TimePickerUnits } from "./enums";
import { isUnitTimeInValidRange } from "./timePickerUtils";

/**
 * Gets hours for the passed time format.
 * e.g. 20hours in 12h format is set to 8
 * @param {Number} hours - current hours
 * @param {String} timeFormat - AM/PM
 *
 * @returns {Number} - hours in the correct format
 */
const getHoursForTimeFormat = (hours, timeFormat) => {
  if (timeFormat === TimeFormat.H12) {
    if (hours === 0) {
      return TimePickerUnits.HOUR_12.max;
    }
    if (isUnitTimeInValidRange(hours, TimePickerUnits.HOUR_12.type)) {
      return hours;
    }
    if (isUnitTimeInValidRange(hours, TimePickerUnits.HOUR_24.type)) {
      return hours - TimePickerUnits.HOUR_12.max;
    }
  }
  return hours;
};

/**
 * Gets the time in 24h format
 * e.g. 08:00:00:PM in 12h format is set to 20:00:00
 * @param {Object} time - object with hours, minutes, seconds and period
 * @param {String} timeFormat - AM/PM
 *
 * @returns {Object} - time object (hours, minutes, seconds and period) with the hours set
 * into the correct format
 */
const getTimeWithFormat24 = (time, timeFormat) => {
  const { hours, period } = time;
  const timeIn24Format = { ...time };
  if (timeFormat === TimeFormat.H12) {
    if (
      period === PeriodPickerOptions.AM &&
      hours === TimePickerUnits.HOUR_12.max
    ) {
      timeIn24Format.hours = TimePickerUnits.HOUR_24.min;
    } else if (
      period === PeriodPickerOptions.PM &&
      hours < TimePickerUnits.HOUR_12.max
    ) {
      timeIn24Format.hours = hours + TimePickerUnits.HOUR_12.max;
    }
  }
  return timeIn24Format;
};

export { getHoursForTimeFormat, getTimeWithFormat24 };
