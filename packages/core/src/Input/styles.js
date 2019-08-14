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
    borderWidth: " 0 0 1px 0",
    background: "transparent",
    borderColor: theme.hv.palette.atmosphere.atmo6,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo2
    }
  },
  inputRootDisabled: {
    borderColor: theme.hv.palette.atmosphere.atmo6,
    background: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      borderColor: theme.hv.palette.atmosphere.atmo6,
      background: theme.hv.palette.atmosphere.atmo4,
      cursor: "not-allowed"
    },
    cursor: "not-allowed"
  },
  inputRootFocused: {
    borderStyle: "solid",
    borderWidth: " 0 0 1px 0",
    borderColor: theme.hv.palette.accent.acce1,
    background: theme.hv.palette.atmosphere.atmo2,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo2
    }
  },
  input: {
    height: `21px`,
    marginLeft: `${theme.hv.spacing.xs}px`,
    marginRight: `${theme.hv.spacing.xs}px`,
    padding: "6px 0 5px",
    ...theme.hv.typography.normalText,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::placeholder": {
      ...theme.hv.typography.placeholderText
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
  labelContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  label: {
    paddingBottom: "8px",
    display: "block"
  },
  labelDisable: {
    color: theme.hv.palette.atmosphere.atmo7
  },
  infoIconContainer: {
    height: `${theme.hv.spacing.md}px`
  },
  infoText: {
    paddingTop: "8px",
    display: "block"
  },
  textWarning: {
    color: theme.hv.palette.accent.acce1
  },
  iconFlexBox: {
    display: "flex",
    flexDirection: "row"
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
  suggestionsContainer: {
    width: "100%",
    position: "relative"
  },
  suggestionList: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    position: "absolute",
    width: "100%"
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0px 1000px ${
        theme.hv.palette.atmosphere.atmo1
      } inset`,
      "-webkit-text-fill-color": theme.hv.typography.normalText.color
    }
  }
});

export default styles;
