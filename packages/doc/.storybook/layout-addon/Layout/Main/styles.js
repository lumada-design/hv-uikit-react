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
  header: {
    backgroundColor: theme.hv.palette.accent.acce0,
    ...theme.hv.typography.normalText.atmo1,
    borderBottomColor: theme.hv.palette.atmosphere.atmo5,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    padding: "10px",
    fontSize: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    zIndex: "100",
    padding: "5px 15px",
    height: "50px"
  },
  core: {
    color: theme.hv.typography.normalText.atmo7
  },
  lab: {
    color: theme.hv.typography.normalText.atmo7
  },
  content: {
    width: "100%",
    padding: "80px 50px 20px"
  },
  name: {
    fontWeight: theme.hv.typography.highlightText.fontWeight
  },
  title: {
    ...theme.hv.typography.highlightText,
    fontSize: 25,
    lineHeight: "50px"
  },
  link: {
    fontSize: 12
  },
  description: {
    ...theme.hv.typography.normalText,
    marginBottom: 20,
    maxWidth: 900
  }
});

export default styles;
