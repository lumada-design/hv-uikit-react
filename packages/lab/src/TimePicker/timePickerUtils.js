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

import { PeriodPickerOptions, TimePickerUnits } from "./enums";

/**
 * Gets the period(am/pm) for a given time
 * @param {Date} date - Date to get the period from. The default date is the current one.
 * @returns {String} - AM or PM
 */
const getPeriodForDate = (date = new Date()) => {
  const hours = date.getHours();
  return hours < 12 ? PeriodPickerOptions.AM : PeriodPickerOptions.PM;
};

/**
 * Checks if the unit time value is inside the acceptable range
 * 
 * @param {Number} value - unit time value
 * @param {String} type - unit time type. One of the TimePickerUnits types.
 */
const isUnitTimeInValidRange = (value, type) => {
  const timeUnit = TimePickerUnits[type];
  return value >= timeUnit.min && value <= timeUnit.max;
};

export {
  getPeriodForDate,
  isUnitTimeInValidRange
};
