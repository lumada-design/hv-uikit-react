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
  header: {
    height: 40,
    backgroundColor: theme.hv.palette.semantic.sema2,
    ...theme.hv.typography.normalText,
    padding: "10px 0 0 15px",
    fontSize: 16
  },
  core: {
    backgroundColor: theme.hv.palette.semantic.sema1,
    color: theme.palette.common.white
  },
  lab: {
    backgroundColor: theme.hv.palette.semantic.sema3,
    color: theme.palette.common.white
  },
  content: {
    width: "100%",
    padding: "30px 50px"
  },
  name: {
    fontWeight: theme.hv.typography.highlightText.fontWeight
  },
  title: {
    ...theme.hv.typography.highlightText,
    fontSize: 25,
    lineHeight: "50px"
  },
  link: {
    fontSize: 12
  },
  description: {
    ...theme.hv.typography.normalText,
    marginBottom: 20,
    maxWidth: 900
  }
});

export default styles;
