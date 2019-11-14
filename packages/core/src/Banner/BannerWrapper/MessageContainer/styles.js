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
  message: {
    ...theme.hv.typography.normalText,
    color: theme.hv.palette.base.base2,
    wordBreak: "break-all",
    maxHeight: "80px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  },
  messageWithoutIcon: {
    paddingLeft: `${theme.hv.spacing.sm}px`
  },
  actionMessageContainer: {
    padding: `${theme.hv.spacing.xs}px`,
    flex: "0 0 auto"
  },
  message: {
    color: theme.hv.palette.base.base2
  },
  messageSpan: {
    display: "flex",
    alignItems: "center"
  }
});

export default styles;
