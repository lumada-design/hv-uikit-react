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
    maxHeight: "80px",
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
    paddingLeft: `${theme.hv.spacing.xs}px`,
    paddingTop: "5px",
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px",
    display: "table-cell",
    verticalAlign: "middle"
  },
  message: {
    padding: 0
  },
  messageSpan: {
    display: "table",
    margin: `${theme.hv.spacing.xs}px 0`,
    minHeight: "32px",
    width: "310px",
    maxHeight: "60px"
  },
  messageText: {
    ...theme.hv.typography.normalText,
    color: theme.hv.palette.base.base2,
    fontFamily: theme.hv.typography.fontFamily,
    maxHeight: "60px",
    display: "table-cell",
    verticalAlign: "middle"
  },
  messageWithoutIcon: {
    paddingLeft: `${theme.hv.spacing.sm}px`
  },
  messageWithoutAction: {
    paddingRight: `${theme.hv.spacing.sm}px`
  },
  action: {
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingLeft: `${theme.hv.spacing.xs}px`,
    display: "table-cell",
    verticalAlign: "middle",
    textAlign: "right"
  }
});

export default styles;
