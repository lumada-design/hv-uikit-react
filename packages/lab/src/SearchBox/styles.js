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

const root = theme => ({
  position: "relative",
  background: theme.hv.palette.atmosphere.atmo1,
  height: "32px",
  paddingLeft: `${theme.hv.spacing.xs}px`,
  paddingRight: `${theme.hv.spacing.md}px`
});

const icon = {
  position: "absolute",
  right: 0,
  width: "32px",
  height: "32px"
};

const styles = theme => ({
  rootWithoutInput: {
    ...root(theme),
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
  },
  rootWithInput: {
    ...root(theme),
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
  },

  input: {
    border: "none",
    height: "30px",
    width: "100%",
    background: "transparent",
    ...theme.hv.typography.normalText,
    "&:focus": {
      outline: "none"
    },
    "&::placeholder": {
      ...theme.hv.typography.normalText,
      color: theme.hv.typography.disabledText.color
    }
  },
  icon: {
    ...icon
  },
  iconClear: {
    ...icon,
    cursor: "pointer"
  }
});

export default styles;
