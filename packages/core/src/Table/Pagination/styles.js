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
  paginationContainer: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    padding: "3px",
    margin: `${theme.hv.spacing.md}px 0 0 0`
  },
  pageSizeOptions: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "0"
  },
  pageSizeOptionsSelect: {
    "-webkit-appearance": "listbox",
    "-webkit-border-radius": "0px",
    padding: "2px 7px",
    margin: `0px ${theme.hv.spacing.xs}px`,
    fontSize: "14px",
    fontWeight: "normal",
    outline: "none",
    height: "32px",
    width: `${theme.hv.spacing.lg}px`,
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
    color: theme.hv.palette.accent.acce1,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    backgroundSize: "26px 26px",
    "&::-ms-expand": {
      display: "none"
    }
  },
  pageNavigator: {
    display: "flex",
    alignItems: "stretch",
    height: "32px"
  },
  pageInfo: {
    display: "inline-block",
    margin: `0 ${theme.hv.spacing.xs}px`,
    whiteSpace: "nowrap",
    height: "32px"
  },
  pageJump: {
    display: "inline-block"
  },
  rowText: {
    ...theme.hv.typography.normalText,
    marginLeft: `${theme.hv.spacing.xs}px`
  },
  pageJumpInput: {
    ...theme.hv.typography.normalText,
    width: "50px",
    textAlign: "right",
    fontSize: "14px",
    margin: `-1px ${theme.hv.spacing.xs}px`,
    padding: "2px 5px",
    borderRadius: "0",
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
    height: "32px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  arrowEnabled: {
    cursor: "pointer"
  },
  pageSizeInput: {
    ...theme.hv.typography.labelText,
    textAlign: "right"
  },
  pageSizeInputContainer: {
    width: 70,
    minWidth: 70,
    maxWidth: 100,
    padding: `0 ${theme.hv.spacing.xs}px`
  },
  pageSizeInputIconClear: {
    display: "none"
  },
  pageSizeInputList: {
    width: 90,
    minWidth: 90,
    maxWidth: 90
  },
  iconContainer: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    "&>svg": {
      margin: "0 auto"
    }
  },
  selectDownIcon: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    pointerEvents: "none",
    right: "44px",
    top: "11px",
    "&>svg": {
      margin: "0 auto"
    }
  }
});

export default styles;
