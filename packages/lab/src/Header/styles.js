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
    position: "relative"
  },
  navButton: {
    zIndex: "3",
    cursor: "pointer",
    width: "32px",
    height: "32px"
  },
  verticalNav: {
    display: "none",
    left: "-320px"
  },
  hidden: {
    display: "flex"
  },
  navContainer: {
    flex: 1
  },
  [theme.breakpoints.up("md")]: {
    navButton: {
      display: "none"
    }
  },
  [theme.breakpoints.down("sm")]: {
    hidden: {
      display: "none"
    },
    navContainer: {
      display: "none"
    },
    verticalNav: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "absolute",
      top: "46px",
      width: "320px",
      transition: "333ms",
      height: "calc(100vh - 46px)",
      backgroundColor: theme.hv.palette.atmosphere.atmo1
    },
    showNav: {
      transition: "333ms",
      left: "0px"
    },
    userAction: {
      borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
    }
  }
});

export default styles;
