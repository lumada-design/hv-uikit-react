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
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    lineHeight: "50px",
    marginTop: 40
  },
  titleContainer: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center"
  },
  content: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    marginBottom: "30px"
  },
  component: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    padding: "20px"
  },
  iconCode: {
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
});

export default styles;
