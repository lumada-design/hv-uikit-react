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
    width:"300px",
    padding: "30px 0px 0px 0px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    display: "flex",
    position: "relative",
    left: "auto",
    zIndex: 1,
    margin: `53px 0 ${theme.hv.spacing.sm}px`,
    overflow: "auto"
  },
  h3: {
    margin: "0px"
  },
  inputUser: {
    position: "relative",
    paddingBottom: 19,
    marginTop: 22
  },
  inputPassword: {},
  button: {
    width: "120px",
    float: "right",
    position: "absolute",
    right: 0,
    top: 0
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
    marginTop: "52px"
  },
  separator: {
    width: `${theme.hv.spacing.sm}px`
  },
  forgotCredentials: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center"
  },
  checkBoxTypography: {
    ...theme.hv.typography.infoText
  },
  sentenceCase:{
    textTransform: `full-size-kana`
  },
  linkButtonTypography: {
    fontSize: theme.hv.typography.infoText.fontSize
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
