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
    minWidth: "250px",
    width: "300px",
    padding: `${theme.hv.spacing.sm}px 0px 0px 0px`,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50
  },
  title: {
    display: "flex",
    position: "relative",
    left: "auto",
    zIndex: 1,
    marginBottom: `${theme.hv.spacing.xs}px`,
    overflow: "auto"
  },
  h3: {
    margin: "0px"
  },
  inputUser: {
    position: "relative",
    paddingBottom: `${theme.hv.spacing.md}px`,
    marginTop: 10
  },
  inputPassword: {},
  button: {
    width: "120px",
    float: "right",
    position: "absolute",
    right: 0,
    top: 0,
    textTransform: "none"
  },
  buttonsContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: `${theme.hv.spacing.lg}px`
  },
  buttonsContainerWithRemember: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "52px"
  },
  separator: {
    width: `${theme.hv.spacing.sm}px`
  },
  forgotCredentials: {
    marginTop: `${theme.hv.spacing.sm}px`,
    display: "flex",
    justifyContent: "center"
  },
  checkBoxTypography: {
    ...theme.hv.typography.normalText
  },
  sentenceCase: {
    textTransform: `full-size-kana`
  },
  showMessage: {
    backgroundColor: theme.hv.palette.semantic.sema9,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingRight: `${theme.hv.spacing.xs}px`
  },
  showCustomMessage: {
    backgroundColor: theme.hv.palette.semantic.sema7,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingRight: `${theme.hv.spacing.xs}px`,
    paddingLeft: `${theme.hv.spacing.xs}px`,
    whiteSpace: "pre-wrap",
    "& > p": {
      ...theme.hv.typography.normalText,
      color: theme.hv.palette.base.base2
    }
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
