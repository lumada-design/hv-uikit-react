/*
 * Copyright 2020 Hitachi Vantara Corporation
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
    marginTop: "5px",
    marginBottom: "0px",
    zIndex: theme.zIndex.drawer
  },
  fixed: {
    position: "fixed",
    top: "50px",
    bottom: 0
  },
  relative: {
    position: "relative"
  },
  absolute: {
    position: "absolute"
  },
  static: {
    position: "static"
  },
  container: {
    display: "flex",
    zIndex: 20,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`
  },
  contentContainer: {
    paddingTop: `${theme.hv.spacing.sm}px`,
    paddingBottom: `${theme.hv.spacing.sm}px`,
    height: "100%",
    minWidth: "320px",
    overflow: "auto",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  userInfo: {
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    " & > :not(:first-child)": {
      paddingTop: "5px"
    }
  }
});

export default styles;
