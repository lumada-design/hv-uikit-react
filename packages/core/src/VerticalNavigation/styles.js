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
  verticalContainer: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "320px",
    height: "100%",
    overflow: "hidden",
    "& >div": {
      height: "100%"
    }
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  listContainer: {
    height: "100%",
    overflowY: "hidden"
  },
  searchBoxContainer: {
    margin: "20px 20px 8px 20px",
  },
  withSearch: {
    maxHeight: "calc(100% - 61px)"
  },
  withTitle: {
    maxHeight: "calc(100% - 63px)"
  },
  withTitleAndSearch: {
    maxHeight: "calc(100% - 130px)"
  },
  scrollContainer: {
    overflowY: "auto",
    padding: "20px"
  },
  actionContainer: {
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingBottom: `${theme.hv.spacing.sm}px`,
    paddingTop: `${theme.hv.spacing.xs}px`
  },
  soloActionContainer: {
    borderTop: `none`,
  }
});

export default styles;
