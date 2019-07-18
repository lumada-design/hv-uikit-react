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
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    position: "relative"
  },
  title: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.mTitle,
  },
  titleShort: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.mTitle,
    marginRight: "30px"
  },
  subheader: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    paddingTop: `${theme.hv.spacing.xs}px`
  },
  action: {
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "-1px",
    paddingLeft: `${theme.hv.spacing.xs}px`
  },
  content: {}
});

export default styles;
