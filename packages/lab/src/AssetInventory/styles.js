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
  width: 32,
  height: 32
};

const styles = theme => ({
  container: {
    position: "relative",
    overflow: "auto",
    display: "flex",
    flexFlow: "column"
  },
  title: {
    ...theme.hv.typography.xlTitle
  },
  gridContainer: {
    width: "auto"
  },
  clearPadding: {
    paddingTop: 0,
    paddingBottom: 0
  },
  searchBoxContainer: {
    position: "relative",
    height: `${icon.height + parseInt(theme.hv.spacing.md, 10)}px`,
    marginTop: `${theme.hv.spacing.md}px`,
    padding: 0
  },
  viewModeContainer: {
    position: "relative",
    height: `${icon.height + parseInt(theme.hv.spacing.md, 10)}px`,
    marginTop: "26px",
    textAlign: "right"
  },
  emptyStateContainer: {
    width: "100%",
    flexGrow: 1
  },
  childrenListContainer: {
    width: "100%",
    marginTop: `${theme.hv.spacing.sm}px`,
    flexGrow: 1
  },
  iconsWrapper: {
    display: "flex",
    height: icon.height
  },
  iconSelected: {
    ...icon,
    background: theme.hv.palette.accent.acce1,
    "& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo2
    }
  },
  iconChangeView: {
    ...icon,
    cursor: "pointer"
  }
});

export default styles;
