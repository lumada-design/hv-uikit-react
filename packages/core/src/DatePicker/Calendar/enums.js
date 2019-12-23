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

/**
 * View modes for the calendar component.
 */
export const VIEW_MODE = {
  CALENDAR: "calendar",
  MONTHLY: "monthly",
  YEARLY: "yearly"
};

/**
 * Option values that can be used with Intl to represent a part or multiple parts of a date.
 */
export const REPRESENTATION_VALUES = {
  LONG: "long",
  SHORT: "short",
  NARROW: "narrow",
  NUMERIC: "numeric",
  TWO_DIGIT: "2-digit"
};

/**
 * Navigation options for the calendar component.
 */
export const NAV_OPTIONS = {
  PREVIOUS_MONTH: "previous_month",
  PREVIOUS_YEAR: "previous_year",
  NEXT_MONTH: "next_month",
  NEXT_YEAR: "next_year",
  MONTH: "month",
  MONTH_YEAR: "month_year"
};
