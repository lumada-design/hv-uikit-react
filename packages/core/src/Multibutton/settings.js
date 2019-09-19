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
const settings = ({
    // width per character inside button label
    WIDTH_PER_CHAR: 8.7,
    // width of icon inside button container
    ICON_WIDTH:24,
    // button padding
    PADDING_DIM:10,
    // border size
    BORDER_DIM:1,
    // icon container width
    ICON_BTN_WIDTH:32,
    // min width of button component
    BTN_MIN_WIDTH:70
});

export default settings;