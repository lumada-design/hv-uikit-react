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
  controlsContainer: {
    display: "flex",
    paddingBottom: `${theme.hv.spacing.md}px`,
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  search: {
    justifyContent: "flex-end"
  },
  rightControls: {
    display: "flex",
    alignItems: "flex-end"
  },
  multiButtons: {
    paddingLeft: `${theme.hv.spacing.md}px`
  },
  viewContainer: {
    overflow: "auto",
    padding: `${theme.hv.spacing.md}px 0`,
    width: "100%"
  },
  sortContainer: {},
  searchBoxContainer: {
    width: "250px"
  },
  pagination:{
    marginTop:0
  }
});

export default styles;
