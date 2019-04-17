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

const styles = theme => ({
  container: {
    minWidth: "150px",
    maxWidth: "610px"
  },
  inputRoot: {
    margin: "0",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    background: theme.hv.palette.atmosphere.atmo1,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    }
  },
  inputRootDisabled: {
    borderColor: theme.hv.palette.atmosphere.atmo6,
    background: theme.hv.palette.atmosphere.atmo2,
    "&:hover": {
      borderColor: theme.hv.palette.atmosphere.atmo6,
      background: theme.hv.palette.atmosphere.atmo2,
      cursor: "not-allowed"
    },
    cursor: "not-allowed"
  },
  inputRootFocused: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.hv.palette.accent.acce1,
    background: theme.hv.palette.atmosphere.atmo1,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    }
  },
  input: {
    height: 20,
    marginLeft: `${theme.hv.spacing.xs}px`,
    marginRight: `${theme.hv.spacing.xs}px`,
    padding: "5px 0 5px",
    ...theme.hv.typography.normalText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::placeholder": {
      ...theme.hv.typography.disabledText
    },
    "&::-ms-clear": {
      display: "none"
    }
  },
  inputDisabled: {
    cursor: "not-allowed"
  },
  multiLine: {
    padding: 0
  },
  label: {
    paddingBottom: `${theme.hv.spacing.xs}px`,
    display: "block",
    ...theme.hv.typography.labelText
  },
  text: {
    paddingTop: `${theme.hv.spacing.xs}px`,
    display: "block",
    ...theme.hv.typography.disabledText
  },
  textInfo: {
    color: theme.hv.typography.disabledText.color
  },
  textWarning: {
    color: theme.hv.palette.semantic.sema6
  },
  icon: {
    width: `${theme.hv.spacing.md}px`,
    height: `${theme.hv.spacing.md}px`
  },
  iconContainer: {
    width: `${theme.hv.spacing.md}px`,
    height: `${theme.hv.spacing.md}px`
  },
  iconClear: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer"
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0px 1000px white inset"
    }
  }
});

export default styles;
