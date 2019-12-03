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
    pointerEvents: "none"
  },
  tooltip: {
    maxWidth: 532,
    padding: "15px 20px",
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: "0 2px 12px rgba(65,65,65,.12)",
    width: "fit-content",
    "& p": {
      display: "-webkit-box",
      width: "fit-content",
      boxOrient: "vertical",
      textOverflow: "ellipsis",
      overflow: "hidden",
      color: theme.hv.palette.accent.acce1
    }
  },
  multitooltip: {
    maxWidth: 532,
    padding: 0,
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: "0 2px 12px rgba(65,65,65,.12)",
    width: "fit-content",
    "& p": {
      display: "-webkit-box",
      width: "fit-content",
      boxOrient: "vertical",
      textOverflow: "ellipsis",
      overflow: "hidden",
      color: theme.hv.palette.accent.acce1
    }
  },
  popper: {
    opacity: 1
  },
  title: {
    padding: "15px 20px 5px 20px",
    borderBottom: `3px solid ${theme.hv.palette.atmosphere.atmo2}`
  },
  valuesContainer: {
    padding: `${theme.hv.spacing.sm}px`
  },
  values: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    "&:last-child": {
      paddingBottom: 0
    }
  },
  color: {
    width: `${theme.hv.spacing.xs}px`,
    height: theme.hv.typography.vizText.lineHeight
  },
  separator: {
    width: `${theme.hv.spacing.xs}px`
  },
  separatorColor: {
    width: "5px"
  },
  valueWrapper: {
    padding: `${theme.hv.spacing.sm}px`
  }
});

export default styles;
