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
    minWidth: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap"
  },
  message: {
    ...theme.hv.typography.normalText,
    wordBreak: "break-all",
    maxHeight: "80px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  },
  action: {
    padding: `${theme.spacing.xs}px 0 ${theme.spacing.xs}px  ${
      theme.spacing.sm
    }px`,
    flex: "0 0 auto",
    marginRight: `${theme.spacing.xs}px`
  },
  baseVariant: {
    minHeight: "52px",
    maxHeight: "92px",
    padding: 0,
    overflow: "hidden"
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
    marginRight: "5px",
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px",
    alignSelf: "auto"
  },
  outContainer: {
    width: "100%",
    position: "relative"
  }
});

export default styles;
