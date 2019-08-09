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
  root: {
    display: "flex",
    alignItems: "center",
    zIndex: 0
  },
  centerContainer: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    maxWidth: "170px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      textDecoration: "none",
      color: theme.hv.palette.accent.acce2h
    }
  },
  iconContainer: {
    display: "inherit"
  },
  separator: {
    margin: "0 -4px",
    display: "contents"
  }
});

export default styles;
