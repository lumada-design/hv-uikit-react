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

// This file contains definitions for controlling the display of the element,
// removing hard-coded values from the codebase itself
// these values assist in calculating the dimensions for the buttons
// placed within the multibutton container and the container itself
// Adjusting these values, changes the way in which the component is displayed,
// These values are related to the dimensions of the button component itself.
// If the dimensions of the button component in this UI Kit change, then these values have to be
// changed in order to reflect these modifications
import settings from "./settings";

/**
 * This function calculates the width to be applied to each button
 * taking into account the longest value string in the buton props
 * and then calculating the dimension, by taking into account paddings and
 * border dimensions, as set in the settings file
 *
 * @param {array} buttonDefs - contains the properties of each button
 * @param {String} buttonType - the type of button: if just an icon, text or icon and text
 *
 */
const calculatedBtnWidth = (buttonDefs, buttonType) => {
  if (buttonType === "icon") {
    return settings.ICON_BTN_WIDTH;
  }

  const calculatedWidth =
    buttonDefs.reduce((a, b) => (a.value.length > b.value.length ? a : b)).value
      .length *
      settings.WIDTH_PER_CHAR +
    (settings.PADDING_DIM * 2 + settings.BORDER_DIM * 2) +
    (buttonDefs[0].icon ? settings.ICON_WIDTH : 0);

  return calculatedWidth < settings.BTN_MIN_WIDTH
    ? settings.BTN_MIN_WIDTH
    : calculatedWidth;
};

export default calculatedBtnWidth;