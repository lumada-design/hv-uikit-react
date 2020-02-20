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

/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  root: {
    display: "flex",
    marginTop: "5px",
    marginBottom: "0px"
  },
  fixed: {
    position: "fixed",
    zIndex: theme.zIndex.drawer,
    top: "50px",
    bottom: 0
  },
  relative: {
    position: "relative",
    "&$withAnchorBar": {
      height: "100%"
    }
  },
  absolute: {
    position: "absolute"
  },
  static: {
    position: "static"
  },
  withAnchorBar: {
    height: "100%"
  },
  verticalContainer: {
    display: "flex",
    zIndex: 20
  },
  anchorBar: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "52px",
    height: "100%",
    overflow: "hidden",
    padding: `${theme.hv.spacing.xs}px`
  },
  button: {
    marginTop: `${theme.hv.spacing.xs}px`
  },
  separator: {
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    width: "3px"
  },
  contentContainer: {
    height: "100%",
    overflow: "auto",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

export default styles;
