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
  rangeLabel: {
    paddingBottom: "10px"
  },
  background: {
    backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`,
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderTop: "1px solid transparent",
    borderLeft: "1px solid transparent",
    borderRight: "1px solid transparent"
  },
  headerDayOfWeek: {
    paddingTop: "5px",
    paddingLeft: `${theme.hv.spacing.xs}px`
  },
  headerDate: {
    padding: `5px ${theme.hv.spacing.xs}px`
  },
  invalid: {
    border: `1px solid ${theme.hv.palette.semantic.sema4}`
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.mTitle,
    width:"100%",
    "&::-webkit-inner-spin-button, &::-webkit-calendar-picker-indicator": {
      " -webkit-appearance": "none",
      display: "none"
    }
  }
});

export default styles;
