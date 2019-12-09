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

const icon = {
  width: "32px",
  height: "32px",
  cursor: "pointer"
};

const styles = theme => ({
  unitTimeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  unitTimeInput: {
    ...theme.hv.typography.sTitle,
    fontWeight: 600,
    textAlign: "center",
    height: "40px",
    width: "40px",
    padding: 0,
    margin: 0,
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      margin: 0
    },
    "&[type=number]": {
      "-webkit-appearance": "textfield",
      "-moz-appearance": "textfield"
    }
  },
  unitTimeInputRoot: {},
  unitTimeInputRootInvalid: {
    border: "1px red solid"
  },
  addIcon: {
    ...icon,
    marginTop: `${theme.hv.spacing.sm}px`
  },
  subtractIcon: {
    ...icon,
    marginBottom: `${theme.hv.spacing.sm}px`
  },
  inputContainer: {
    minWidth: "40px",
    maxWidth: "40px"
  }
});

export default styles;
