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

const inputRoot = theme => ({
  position: "relative",
  background: theme.hv.palette.atmosphere.atmo1,
  height: "32px",
  paddingLeft: `${theme.hv.spacing.xs}px`,
  paddingRight: `${theme.hv.spacing.md}px`
});

const icon = {
  position: "absolute",
  right: 0,
  width: "32px",
  height: "32px",
  bottom: "0px"
};

const styles = theme => ({
  inputWithoutValue: {
    ...inputRoot(theme),
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  inputWithValue: {
    ...inputRoot(theme),
    border: `1px solid ${theme.hv.palette.accent.acce1}`
  },
  inputWithCalendarVisible: {
    ...inputRoot(theme),
    borderWidth: `1px 1px 0px 1px`,
    borderStyle: `solid`,
    borderColor: `${theme.hv.palette.accent.acce1}`,
    borderBottom: `1px solid transparent`
  },
  input: {
    border: "none",
    height: "30px",
    width: "100%",
    background: "transparent",
    ...theme.hv.typography.normalText,
    "&:focus": {
      outline: "none"
    },
    "&::placeholder": {
      ...theme.hv.typography.normalText,
      color: theme.hv.typography.disabledText.color
    }
  },
  icon: {
    ...icon,
    cursor: "pointer"
  },
  iconWithCalendarVisible: {
    ...icon
  },
  iconClear: {
    ...icon,
    cursor: "pointer"
  },
  datePickerContainer: {
    position: "relative",
    width: "320px"
  },
  label: {
    marginBottom: `${theme.hv.spacing.xs}px`,
    display: "block"
  },
  calendarContainer: {
    position: "absolute",
    zIndex: "10",
    width: "100%"
  }
});

export default styles;
