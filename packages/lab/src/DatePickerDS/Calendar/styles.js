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
  calendarWrapper: {
    position: "relative",
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    borderTop: "none",
    overflow: "hidden",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: `${theme.hv.spacing.sm}px`
  },
  calendarGrid: {
    display: "grid",
    gridTemplate: "repeat(7, auto) / repeat(7, auto)"
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.hv.spacing.xs}px 0`
  },
  navigationMonth: {
    minWidth: "160px"
  },
  calendarDay: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px"
  },
  calendarDate: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
      cursor: "pointer"
    }
  },
  calendarDateNotInMonth: {
    color: `${theme.hv.palette.atmosphere.atmo6}`
  },
  calendarDateSelected: {
    backgroundColor: `${theme.hv.palette.accent.acce1}`,
    color: `${theme.hv.palette.atmosphere.atmo1}`,
    "&:hover": {
      backgroundColor: `${theme.hv.palette.accent.acce1}`,
      color: `${theme.hv.palette.atmosphere.atmo1}`
    }
  },
  actionsContainer: {
    marginTop: `${theme.hv.spacing.sm}px`,
    textAlign: "right"
  },
  calendarMonthlyGrid: {
    display: "grid",
    gridTemplate: "repeat(3, 40px) / repeat(3, auto)",
    justifyContent: "space-evenly",
    alignContent: "center",
    // This is needed in order to have the monthly view showing on top of the rest
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    position: "absolute",
    width: "100%",
    height: "calc(100% - 100px)",
    top: "0",
    marginTop: "100px",
    left: "0",
    zIndex: "10"
  },
  calendarMonthlyCell: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    minWidth: "92px",
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
      cursor: "pointer"
    }
  },
  calendarMonthlyCellSelected: {
    backgroundColor: `${theme.hv.palette.accent.acce1}`,
    color: `${theme.hv.palette.atmosphere.atmo1}`,
    "&:hover": {
      backgroundColor: `${theme.hv.palette.accent.acce1}`,
      color: `${theme.hv.palette.atmosphere.atmo1}`
    }
  }
});

export default styles;
