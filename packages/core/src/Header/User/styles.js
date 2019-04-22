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
  userContainer: {
    paddingLeft: `${theme.hv.spacing.lg}px`,
    height: "100%",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    marginLeft: "auto"
  },
  userContainerPointer: {
    cursor: "pointer"
  },
  iconContainer: {
    display: "inherit",
    maxHeight: "46px"
  },
  iconContainerHover: {
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",

    marginRight: `${theme.hv.spacing.xs}px`,
    "& p": {
      color: theme.palette.text.main
    }
  }
});

export default styles;
