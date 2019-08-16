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

const TimePickerUnits = {
  HOUR_24: {
    type: "HOUR_24",
    min: 0,
    max: 23
  },
  HOUR_12: {
    type: "HOUR_12",
    min: 1,
    max: 12
  },
  MINUTE: {
    type: "MINUTE",
    min: 0,
    max: 59
  },
  SECOND: {
    type: "SECOND",
    min: 0,
    max: 59
  }
};

const PeriodPickerOptions = {
  AM: "AM",
  PM: "PM"
};

const TimeFormat = {
  H12: 12,
  H24: 24
};

export { TimePickerUnits, PeriodPickerOptions, TimeFormat };
