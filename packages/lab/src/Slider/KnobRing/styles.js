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

const styles = props => {
  const { hoverColor, dragging } = props;
  let borderValue = "0px solid transparent";
  if (!dragging && hoverColor) {
    borderValue = `9px solid ${hoverColor}`;
  }

  return {
    knobRing: {
      position: "relative",
      borderColor: "transparent",
      borderRadius: "50%",
      boxShadow: "none",
      backgroundColor: "transparent",
      width: "32px",
      height: "32px",
      top: "-82%",
      left: "-82%",
      "&:hover": {
        border: borderValue
      },
      "&:active": {
        border: borderValue
      }
    }
  };
};

export default styles;
