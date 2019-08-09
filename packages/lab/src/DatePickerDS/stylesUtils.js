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
 * Returns the classes that should be applied to the calendar container in single mode having into consideration the
 * placement of the popper component.
 *
 * @param {Object} classes - Classes object to be used.
 * @param {string} placement - Placement of the popper component.
 * @returns {string} The classes to be applied to the container.
 */
export const getSingleCalendarContainerClasses = (classes, placement) =>
  placement && placement.includes("bottom")
    ? `${classes.calendarContainer} ${classes.borderTopNone}`
    : `${classes.calendarContainer} ${classes.borderBottomNone}`;

/**
 * Returns the classes that should be applied to the calendar container in range mode having into consideration the
 * placement of the popper component.
 *
 * @param {Object} classes - Classes object to be used.
 * @param {string} placement - Placement of the popper component.
 * @returns {string} The classes to be applied to the container.
 */
export const getRangeCalendarContainerClasses = (classes, placement) =>
  placement && placement.includes("bottom")
    ? `${classes.rangeMainContainer} ${classes.borderTopNone}`
    : `${classes.rangeMainContainer} ${classes.borderBottomNone}`;

/**
 * Returns the classes that should be applied to the range right calendar container in range mode having into consideration the
 * placement of the popper component.
 *
 * @param {Object} classes - Classes object to be used.
 * @param {string} horizontalPlacement - The horizontal placement of the poper component
 * @param {string} placement - Placement of the popper component.
 * @returns {string} The classes to be applied to the container.
 */
export const getRangeRightCalendarContainerClasses = (
  classes,
  horizontalPlacement,
  placement
) =>
  placement && placement.includes("bottom") && horizontalPlacement === "left"
    ? `${classes.rangeRightCalendarContainer} ${classes.borderTopDisplay}`
    : `${classes.rangeRightCalendarContainer}`;

/**
 * Returns the classes that should be applied to the range left calendar container in range mode having into consideration the
 * placement of the popper component.
 *
 * @param {Object} classes - Classes object to be used.
 * @param {string} horizontalPlacement - The horizontal placement of the poper component
 * @param {string} placement - Placement of the popper component.
 * @returns {string} The classes to be applied to the container.
 */
export const getRangeLeftCalendarContainerClasses = (
  classes,
  horizontalPlacement,
  placement
) =>
  placement && placement.includes("bottom") && horizontalPlacement === "right"
    ? `${classes.rangeLeftCalendarContainer} ${classes.borderTopDisplay}`
    : `${classes.rangeLeftCalendarContainer}`;

/**
 * Returns the classes that should be applied to the range footer right container in range mode having into consideration the
 * placement of the popper component.
 *
 * @param {Object} classes - Classes object to be used.
 * @param {string} horizontalPlacement - The horizontal placement of the poper component
 * @param {string} placement - Placement of the popper component.
 * @returns {string} The classes to be applied to the container.
 */
export const getRangeFooterRightClasses = (
  classes,
  horizontalPlacement,
  placement
) =>
  placement && placement.includes("top") && horizontalPlacement === "left"
    ? `${classes.rangeFooterRight} ${classes.borderBottomDisplay}`
    : `${classes.rangeFooterRight}`;

/**
 * Returns the classes that should be applied to the range footer left container in range mode having into consideration the
 * placement of the popper component.
 *
 * @param {Object} classes - Classes object to be used.
 * @param {string} horizontalPlacement - The horizontal placement of the poper component
 * @param {string} placement - Placement of the popper component.
 * @returns {string} The classes to be applied to the container.
 */
export const getRangeFooterLeftClasses = (
  classes,
  horizontalPlacement,
  placement
) =>
  placement && placement.includes("top") && horizontalPlacement === "right"
    ? `${classes.rangeFooterLeft} ${classes.borderBottomDisplay}`
    : `${classes.rangeFooterLeft}`;
