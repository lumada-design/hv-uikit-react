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
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    marginTop: `${theme.hv.spacing.sm}px`
  },
  pageSizeOptions: {
    position: "absolute",
    marginRight: "40px",
    top: "50%",
    transform: "translateY(-50%)",
    left: "0"
  },
  pageSizeOptionsSelect: {
    ...theme.hv.typography.sText,
    "-webkit-appearance": "none",
    border: "none",
    borderRadius: 0,
    padding: "0 6px",
    marginLeft: `${theme.hv.spacing.sm}px`,
    marginRight: `${theme.hv.spacing.xs}px`,
    outline: "none",
    height: "32px",
    width: `${theme.hv.spacing.lg}px`,
    backgroundColor: "transparent",
    backgroundSize: "26px 26px",
    "&::-ms-expand": {
      display: "none"
    },
    "&:hover:enabled": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:focus": {
      outline: "5px auto rgba(0, 150, 255, 1)"
    }
  },
  pageNavigator: {
    display: "flex",
    alignItems: "stretch",
    height: "32px",
    "&>*": {
      margin: `0 ${theme.hv.spacing.xs / 2}px`
    }
  },
  pageInfo: {
    display: "inline-block",
    whiteSpace: "nowrap",
    height: "32px",
    lineHeight: "32px"
  },
  pageJump: {
    display: "inline-block"
  },
  pageSizeInput: {
    ...theme.hv.typography.labelText,
    textAlign: "right"
  },
  pageSizeInputRoot: {
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  pageSizeInputContainer: {
    width: 40,
    minWidth: 40,
    maxWidth: 100
  },
  iconContainer: {
    padding: 0,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:focus": {
      outline: "5px auto rgba(0, 150, 255, 1)"
    }
  },
  icon: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    "&>svg": {
      margin: "0 auto"
    }
  },
  selectDownIcon: {
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    pointerEvents: "none",
    left: "-26px",
    top: "2px",
    "&>svg": {
      margin: "0 auto"
    }
  }
});

export default styles;
