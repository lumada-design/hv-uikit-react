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
  progressbarBack: {
    position: "absolute",
    top: "-1px",
    width: "100%",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
  },
  progressbar: {
    position: "absolute",
    top: "-1px",
    width: "80%",
    border: `1px solid ${theme.hv.palette.accent.acce1}`
  },
  progressText: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "auto"
  },
  icon: {
    width: 32,
    height: 32
  },
  removeButton: {
    marginLeft: `${theme.hv.spacing.sm}px`,
    padding: 0,
    minWidth: "unset"
  },
  fail: {
    color: theme.hv.palette.semantic.sema4
  },
  iconContainer: {
    width: 32,
    height: 32
  },
  textTruncation: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

export default styles;
