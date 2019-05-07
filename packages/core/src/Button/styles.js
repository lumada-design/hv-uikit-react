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
    textTransform: "capitalize",
    "&:hover,&:focus": {},
    "&:active": {},
    minWidth: "70px",
    padding: `0 ${theme.hv.spacing.xs}px`,
    cursor: "pointer",
    height: "32px",
    minHeight: "32px",
    ...theme.hv.typography.highlightText
  },
  containedPrimary: {
    color: theme.hv.palette.atmosphere.atmo1,
    backgroundColor: theme.hv.palette.accent.acce2,
    "&:hover": {
      backgroundColor: theme.hv.palette.accent.acce2h
    },
    "&:active": {
      backgroundColor: theme.hv.palette.accent.acce2
    },
    "&$disabled": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  outlinedPrimary: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    color: theme.hv.palette.accent.acce1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
    },
    "&:active": {
      backgroundColor: theme.hv.palette.atmosphere.atmo1
    },
    "&$disabled": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  textPrimary: {
    color: theme.hv.palette.accent.acce2,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    },
    "&:active": {
      backgroundColor: "transparent"
    },
    "&$disabled": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  disabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    color: theme.hv.palette.atmosphere.atmo7,
    cursor: "not-allowed"
  }
});

export default styles;
