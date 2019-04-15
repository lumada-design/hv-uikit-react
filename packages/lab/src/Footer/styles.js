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
    position: "fixed",
    width: "100%",
    height: 40,
    backgroundColor: theme.hv.palette.accent.acce1,
    [theme.breakpoints.down("500")]: {
      minWidth: "320px"
    }
  },
  labelLeft: {
    float: "left",
    marginTop: 10,
    marginLeft: 20,
    color: theme.hv.palette.atmosphere.atmo3,
    fontSize: "16px",
    letterSpacing: "0.02em",
    lineHeight: `${theme.hv.spacing.sm}px`,
    fontWeight: "600",
    [theme.breakpoints.down("500")]: {
      display: "none"
    }
  },
  labelRight: {
    float: "right",
    marginTop: 12,
    marginRight: 20,
    fontSize: "12px",
    letterSpacing: "0.02em",
    lineHeight: "16px",
    fontWeight: "400",
    color: theme.hv.palette.atmosphere.atmo3,
    [theme.breakpoints.down("500")]: {
      minWidth: "320px",
      float: "left",
      marginLeft: 20,
      fontSize: "11px"
    }
  }
});

export default styles;
