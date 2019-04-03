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
    background: "transparent",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },

  container: {
    maxWidth: "670px",
    display: "flex",
    alignItems: "center"
  },

  iconContainer: {
    height: "120px",
    width: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    marginLeft: `${theme.hv.spacing.lg}px`
  },
  title: {
    ...theme.typography.h4,
  },
  message: {
    ...theme.typography.body1,
    marginTop: `${theme.hv.spacing.xs}px`,
  }
});

export default styles;
