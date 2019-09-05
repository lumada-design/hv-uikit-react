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
  actionsContainer: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    zIndex:2
  },
  marginLeft: {
    marginLeft: `${theme.hv.spacing.lg}px`
  },
  iconContainer: {
    display: "inherit",
    marginLeft: `${theme.hv.spacing.xs}px`,
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  }
});

export default styles;
