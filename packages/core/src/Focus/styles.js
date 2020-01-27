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

import isBrowser from "../utils/browser";

export const outlineStyles = {
  outlineColor: "Highlight",
  outlineStyle: isBrowser(["ie", "edge"]) ? "solid" : "auto",
  outlineWidth: 4,
  outlineOffset: -2
};

const styles = () => ({
  root: {},
  selected: {},
  disabled: {},
  focusDisabled: {
    outline: "none",
    "& *:focus": {
      outline: "none"
    },
    "& *": {
      outline: "none !important"
    }
  },
  focused: {
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "auto",
      outlineOffset: -2
    }
  },
  externalReference: {
    position: "relative"
  },
  falseFocus: {
    width: "98%",
    height: "98%",
    position: "absolute",
    zIndex: "1",
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "auto",
      outlineOffset: -2
    },
    top: 0,
    left: "0.5%",
    backgroundColor: "transparent",
    pointerEvents: "none"
  }
});

export default styles;
