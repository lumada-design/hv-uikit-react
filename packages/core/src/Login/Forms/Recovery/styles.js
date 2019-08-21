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
    height: "100%",
    minWidth: "250px",
    padding: 0
  },
  title: {
    display: "flex",
    position: "relative",
    width: "100%",
    zIndex: 1,
    marginTop: `${theme.hv.spacing.lg}px`,
    justifyContent: "center"
  },
  instructions: {
    position: "relative",
    margin: "0px",
    textAlign: "center",
    fontFamily: theme.hv.typography.fontFamily
  },
  input: {
    position: "relative",
    paddingTop: "100px"
  },
  cancelButton: {
    position: "relative",
    width: "120px"
  },
  submitButton: {
    position: "relative",
    width: "120px",
    float: "right"
  },
  buttonsContainer: {
    position: "relative",
    display: "inherit",
    alignItems: "center",
    marginTop: `${theme.hv.spacing.sm}px`
  },
  buttonsContainerError: {
    position: "relative",
    display: "inherit",
    alignItems: "center",
    marginTop: "4px"
  },
  showOkMessage: {
    backgroundColor: theme.hv.palette.semantic.sema8,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingRight: `${theme.hv.spacing.xs}px`
  },
  iconError: {
    margin: `0 ${theme.hv.spacing.xs}px`,
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px"
  },
  messageContainer: {
    top: `${theme.hv.spacing.sm}px`,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "52px"
  }
});

export default styles;
