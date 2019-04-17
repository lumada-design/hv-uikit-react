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
    position: "absolute",
    width: "310px",
    height: "calc(100% - 50px)",
    margin: "0px 0px 0px -155px",
    padding: 0,
    left: "50%"
  },
  title: {
    display: "flex",
    position: "relative",
    width: "310px",
    zIndex: 1,
    margin: `${theme.hv.spacing.lg}px 0 ${theme.hv.spacing.sm}px`,
    overflow: "auto"
  },
  h3: {
    margin: "0px"
  },
  inputUser: {
    position: "relative",
    paddingBottom: `${theme.hv.spacing.md}px`
  },
  inputPassword: {

  },
  button: {
    width: "120px",
    float: "right",
    position: "relative"
  },
  buttonsContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: `${theme.hv.spacing.sm}px`
  },
  buttonsContainerWithRemember: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    marginTop: `${theme.hv.spacing.sm}px`
  },
  separator: {
    width: `${theme.hv.spacing.sm}px`
  },
  forgotCredentials: {
    marginTop: `${theme.hv.spacing.lg}px`,
    display: "flex",
    justifyContent: "center"
  },
  checkBoxTypography: {
    color: theme.typography.body2.color,
    fontSize: theme.typography.body2.fontSize,
    letterSpacing: theme.typography.body2.letterSpacing,
    lineHeight: theme.typography.body2.lineHeight,
    fontWeight: theme.typography.body2.fontWeight
  },

  linkButtonTypography: {
    fontSize: theme.typography.body2.fontSize
  },
  showMessage: {
    backgroundColor: theme.hv.palette.semantic.sema9,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingRight: `${theme.hv.spacing.xs}px`
  },
  icon: {
    margin: `0 ${theme.hv.spacing.xs}px`,
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px"
  },
  errorMessageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "static",
    height: "52px"
  }
});

export default styles;
