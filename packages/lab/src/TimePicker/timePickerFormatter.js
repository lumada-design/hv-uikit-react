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

import { TimeFormat } from "./enums";

/**
 * Pads the unit time values so that they always have two digits
 * @param {Number} value - unit time value
 * @returns The unit time value with two digits
 */
const padTime = value => {
  if (!value || value < 0 ) {
    return "00";
  }
  if (value < 10 && value.toString().length === 1) {
    return `0${value.toString()}`;
  }
  return value;
};

/**
 * Gets the time format for a given locale
 * @param {String} locale - locale
 * @returns {TimeFormat} the time format for the given locale (12 or 24)
 */
const getTimeFormatForLocale = locale => {
  const options = {
    hour: "numeric"
  };
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const isInHour12Format = dateTimeFormat.resolvedOptions().hour12;
  return isInHour12Format ? TimeFormat.H12 : TimeFormat.H24;
};

/**
 * Formats the time to be rendered
 * @param {Object} time - time object to be rendered
 * @param {Number} time.hours - hours
 * @param {Number} time.minutes - minutes
 * @param {Number} time.seconds - seconds
 * @param {String} time.period - period (am/pm). It is undefined when the time is to be shown in 24h format
 *
 * @returns {String} formatted time
 */
const getFormattedTime = time => {
  const { hours, minutes, seconds } = time;

  let timeToRender = `${padTime(hours)}:${padTime(minutes)}:${padTime(
    seconds
  )}`;
  if (time.period) {
    timeToRender += ` ${time.period}`;
  }
  return timeToRender;
};

export {
  padTime,
  getFormattedTime,
  getTimeFormatForLocale
};
