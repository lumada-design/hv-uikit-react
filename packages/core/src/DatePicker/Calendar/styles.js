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
    overflow: "hidden",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: `${theme.hv.spacing.sm}px`
  },
  calendarGrid: {
    display: "flex",
    flexFlow: "wrap",
    width: "280px"
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
    height: "40px",
    width: "40px"
  },
  calendarDate: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    width: "40px",
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
      cursor: "pointer"
    }
  },
  calendarDateNotInMonth: {
    color: `${theme.hv.palette.atmosphere.atmo7}`
  },
  calendarDateSelected: {
    backgroundColor: `${theme.hv.palette.accent.acce1}`,
    color: `${theme.hv.palette.atmosphere.atmo1}`,
    "&:hover": {
      backgroundColor: `${theme.hv.palette.accent.acce1}`,
      color: `${theme.hv.palette.atmosphere.atmo1}`
    }
  },
  calendarDateInvalid: {
    "&:hover": {
      cursor: "not-allowed",
      backgroundColor: "transparent"
    }
  },
  calendarMonthlyGrid: {
    top: "0",
    height: "calc(100% - 120px)",
    marginTop: "100px",
    marginLeft: "-20px",
    display: "flex",
    zIndex: "10",
    padding: "0 20px",
    position: "absolute",
    flexFlow: "wrap",
    alignContent: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF"
  },
  normalWidth: {
    width: "calc(100% - 2px)" // 2px for the borders.
  },
  rangeModeWidth: {
    width: "calc((100% / 2) - 2px)" // 100% divided by two to handle the range situation minus 2px for the borders.
  },
  calendarMonthlyCell: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    width: "92px",
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
