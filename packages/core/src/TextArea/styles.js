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
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  input: {
    height: "auto",
    padding: "10px 0px",
    overflow: "auto"
  },
  inputRoot: {
    margin: "0",
    width: "100%",
    borderStyle: "solid",
    borderWidth: " 1px",
    background: theme.hv.palette.atmosphere.atmo1,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 1px",
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
    borderWidth: " 1px",
    borderColor: theme.hv.palette.accent.acce1,
    background: theme.hv.palette.atmosphere.atmo1,
    outline: "5px auto rgba(0, 150, 255, 1)",
    "&:hover": {
      borderStyle: "solid",
      borderWidth: " 1px",
      borderColor: theme.hv.palette.accent.acce1,
      background: theme.hv.palette.atmosphere.atmo1
    }
  },
  container: {},
  characterCounter: {
    textAlign: "right",
    paddingTop: `${theme.hv.spacing.xs}px`,
    minWidth: "150px",
    maxWidth: "610px"
  },
  inline: {
    display: "inline"
  },
  separator: {
    margin: `0 3px`
  },
  disabled: {
    ...theme.hv.typography.disabledText
  },
  maxCharacter: {
    ...theme.hv.typography.infoText
  },
  currentCounter: {
    ...theme.hv.typography.labelText
  }
});

export default styles;
