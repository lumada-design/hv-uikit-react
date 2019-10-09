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
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: 0
  },
  success: {
    backgroundColor: theme.hv.palette.semantic.sema8
  },
  error: {
    backgroundColor: theme.hv.palette.semantic.sema9
  },
  default: {
    backgroundColor: theme.hv.palette.semantic.sema7
  },
  iconVariant: {
    marginLeft: `${theme.hv.spacing.xs}px`,
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px",
    alignSelf: "center"
  },
  message: {
    padding: 0
  },
  messageText: {
    ...theme.hv.typography.normalText,
    maxHeight: "82px"
  },
  messageWithoutIcon: {
    paddingLeft: `${theme.hv.spacing.sm}px`
  },
  messageWithoutAction: {
    paddingRight: `${theme.hv.spacing.sm}px`
  },
  containerAlign: {
    display: "table-cell",
    verticalAlign: "middle"
  },
  action: {
    marginRight: `${theme.hv.spacing.sm}px`,
    marginLeft: `${theme.hv.spacing.xs}px`,
    paddingLeft: "0px",
    minWidth: "fit-content"
  },
  messageSpan: {
    display: "flex",
    alignItems: "center",
    margin: `${theme.hv.spacing.xs}px 0`,
    minHeight: "32px"
  },
  rootS: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    "&>svg": {
      margin: "0 auto"
    }
  }
});

export default styles;
