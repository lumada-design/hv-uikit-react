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
    flexGrow: 1
  },
  tabsRoot: {
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    margin: "60px 0 20px"
  },
  tabsIndicator: {
    backgroundColor: theme.hv.palette.accent.acce1,
    bottom: "none",
    top: 0
  },
  tabRoot: {
    textTransform: "initial",
    marginRight: theme.spacing.unit * 4,
    "&:hover": {
      opacity: 1
    },
    "&$tabSelected": {},
    "&:focus": {},
    ...theme.hv.typography.highlightText
  },
  tabSelected: {},
  props: {
    marginTop: 20
  }
});

export default styles;
