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
  height: "32px"
};

const styles = theme => ({
  container: {
    position: "relative",
    overflow: "auto",
    display: "flex",
    flexFlow: "column"
  },
  title: {
    ...theme.typography.h1
  },
  searchBoxContainer: {
    position: "relative",
    height: "auto",
    marginTop: `${theme.hv.spacing.md}px`
  },
  viewModeContainer: {
    position: "relative",
    height: "auto",
    textAlign: "right",
    marginTop: `${theme.hv.spacing.md}px`
  },
  emptyStateContainer: {
    width: "100%",
    flexGrow: 1
  },
  childrenListContainer: {
    width: "100%",
    marginTop: `${theme.hv.spacing.xs}px`,
    flexGrow: 1
  },
  iconsWrapper: {
    display: "flex"
  },
  icon: {
    ...icon
  },
  iconChangeView: {
    ...icon,
    cursor: "pointer"
  }
});

export default styles;
