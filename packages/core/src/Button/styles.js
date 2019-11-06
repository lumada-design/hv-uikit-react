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
    "&:focus": {
      outline: "5px auto rgba(0, 150, 255, 1)"
    },  
    minWidth: "70px",
    padding: `0 ${theme.hv.spacing.xs}px`,
    cursor: "pointer",
    height: "32px",
    minHeight: "32px",
    ...theme.hv.typography.highlightText
  },
  primary: {
    color: theme.hv.palette.accent.acce0,
    backgroundColor: theme.hv.palette.accent.acce2,
    "&:hover": {
      backgroundColor: theme.hv.palette.accent.acce2h
    },
    "&:active": {
      backgroundColor: theme.hv.palette.accent.acce2
    },
    "&$primaryDisabled": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$primaryDisabled&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  primaryDisabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    color: theme.hv.palette.atmosphere.atmo7,
    cursor: "not-allowed"
  },
  secondary: {
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
    "&$secondaryDisabled": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$secondaryDisabled&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  secondaryDisabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    color: theme.hv.palette.atmosphere.atmo7,
    cursor: "not-allowed",
    border: "none"
  },
  ghost: {
    color: theme.hv.palette.accent.acce1,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:active": {
      backgroundColor: "transparent"
    },
    "&$ghostDisabled": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$ghostDisabled&:hover": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  ghostDisabled: {
    backgroundColor: "transparent",
    color: theme.hv.palette.atmosphere.atmo7,
    cursor: "not-allowed"
  },
  ghostSecondary: {
    color: theme.hv.palette.accent.acce2,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:active": {
      backgroundColor: "transparent"
    },
    "&$ghostSecondaryDisabled": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$ghostSecondaryDisabled&:hover": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  ghostSecondaryDisabled: {
    backgroundColor: "transparent",
    color: theme.hv.palette.atmosphere.atmo7,
    cursor: "not-allowed"
  }
});

export default styles;
