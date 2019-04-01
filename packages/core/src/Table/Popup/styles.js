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
  paper: {
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
    padding: `${theme.hv.spacing.xs}px`,
    marginTop: "5px"
  },
  moreVertContainer: {
    height: "100%"
  },
  moreVertBtn: {
    width: "100%",
    height: "100%",
    minWidth: "32px",
    padding: "0",
    "&:hover": {
      background: `${theme.hv.palette.accent.acce1}`,
      color: `${theme.hv.palette.atmosphere.atmo1}`
    }
  },
  activated: {
    background: `${theme.hv.palette.accent.acce1}`,
    color: `${theme.hv.palette.atmosphere.atmo1}`
  },
  actionBtn: {
    display: "block",
    width: "100%",
    color: `${theme.hv.palette.accent.acce2}`
  }
});

export default styles;
