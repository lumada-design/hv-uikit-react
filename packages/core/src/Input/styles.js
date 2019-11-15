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
    background: theme.hv.palette.atmosphere.atmo1,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
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
    background: theme.hv.palette.atmosphere.atmo1,
    outline: "5px auto rgba(0, 150, 255, 1)",
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 0 0 1px 0",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    }
  },
  inputRootInvalid: {
    borderColor: theme.hv.palette.semantic.sema4,
    "&:hover": {
      borderColor: theme.hv.palette.semantic.sema4
    }
  },
  input: {
    height: `20px`,
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
    height: "32px",
    width: "32px",
    display:"flex",
    justifyContent:"center",
    '& div': {
      alignSelf:"center",
      marginTop:-2
    }
  },
  infoText: {
    paddingTop: "8px",
    display: "block"
  },
  textWarning: {
    color: theme.hv.palette.accent.acce1
  },

  adornmentsBox: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    justifyContent:"center"
  },
  adornmentButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer"
  },
  adornmentIconBox: {
    width: `${theme.hv.spacing.md}px`,
    height: `${theme.hv.spacing.md}px`,
    position: "relative",
    "& svg": {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto"
  }
  },

  suggestionsContainer: {
    width: "100%",
    position: "relative",
    top: "-1px"
  },
  suggestionList: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: "0 0 0 #fff, 0px -5px 12px -5px rgba(65,65,65,.12)",
    padding: `${theme.hv.spacing.sm}px`,
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
