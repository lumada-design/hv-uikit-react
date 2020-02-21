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
    minWidth: 70,
    textTransform: "none",
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    "&:focus, &:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    },
    marginRight: 0,
    "&$disabled": {
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "all",
      opacity: 1,
      "&:focus, &:hover": {
        background: "none"
      }
    },
    opacity: 1
  },
  labelContainer: {
    padding: "16px 20px"
  },
  selected: {
    ...theme.hv.typography.highlightText,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    }
  },
  disabled: {}
});

export default styles;
