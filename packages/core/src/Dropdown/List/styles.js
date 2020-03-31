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
  rootList: {
    width: 310
  },
  listContainer: {
    overflow: "auto",
    maxHeight: 270,
    paddingLeft: `${theme.hv.spacing.sm}px`,
    marginRight: "2px",
    paddingRight: "18px",
    paddingBottom: `${theme.hv.spacing.sm}px`
  },
  searchContainer: {
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingBottom: `${theme.hv.spacing.xs}px`
  },
  selectAllContainer: {
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    width: "100%"
  },
  selectAll: {
    "& > span": {
      ...theme.hv.typography.highlightText
    }
  },
  selection: {
    width: "100%"
  },
  actions: {
    textAlign: "right",
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    padding: `${theme.hv.spacing.sm}px`
  },
  marginTop: {
    marginTop: `${theme.hv.spacing.sm}px`
  },
  listBorderDown: {
    display: "block",
    height: `${theme.hv.spacing.sm}px`,
    boxShadow: `0 0 0 ${theme.hv.palette.atmosphere.atmo1}, 0px -5px 12px -5px rgba(65,65,65,.12)`
  },
  list: {
    maxWidth: 310,
    minWidth: 310,
    background: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    borderTop: "none",
    zIndex: 1000
  },
  listClosed: {
    display: "none"
  },
  listOpenDown: {
    display: "block",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`
  },
  listOpenUp: {
    display: "block",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`
  },
  inputExtensionOpen: {
    width: "310px",
    height: "10px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  inputExtensionLeftPosition: {
    marginLeft: "auto"
  },
  inputExtensionOpenShadow: {
    boxShadow: `0px 8px 0px ${theme.hv.palette.atmosphere.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`
  },
  inputExtensionFloatRight: {
    float: "left"
  },
  inputExtensionFloatLeft: {
    float: "right"
  }
});

export default styles;
