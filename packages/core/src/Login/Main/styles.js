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
    flex: 1,
    display: "flex",
    width: "100%",
    minHeight: 580,
    background: `0 / cover fixed`,
    justifyContent: "flex-end"
  },
  rightContainer: {
    width: "30%",
    minWidth: "380px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("500")]: {
      minWidth: "320px",
      width: "100%"
    }
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.9)",
    "&:before": {
      zIndex: "-1",
      content: '""',
      width: "100%",
      height: "100%",
      position: "relative",
      filter: "blur(2px)"
    }
  }
});

export default styles;
