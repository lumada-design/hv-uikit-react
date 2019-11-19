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
    padding:`40px 0 0 ${theme.hv.spacing.sm}px`,
    margin: 0
  },
  messageContainer: {
    display: "flex",
  },
  textWithIcon: {
    paddingLeft: 58
  },
  textWithCustomIcon: {
    paddingLeft: 58,
  },
  icon: {
    position:"absolute",
    top: "31px",
    maxWidth: "48px",
    maxHeight: "48px",
    minWidth: "48px",
    minHeight: "48px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }
});

export default styles;
