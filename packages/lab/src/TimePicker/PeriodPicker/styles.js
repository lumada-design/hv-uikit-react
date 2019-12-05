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

const icon = {
  width: "32px",
  height: "32px",
  cursor: "pointer"
};

const styles = theme => ({
  periodContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&:first-child": { marginTop: `${theme.hv.spacing.sm}px` },
    "&:last-child": { marginBottom: `${theme.hv.spacing.sm}px` }
  },
  periodText: {
    ...theme.hv.typography.highlightText,
    textAlign: "center",
    height: "40px",
    width: "40px",
    paddingTop: `${theme.hv.spacing.xs}px`,
    paddingBottom: `${theme.hv.spacing.xs}px`
  },
  icon: {
    ...icon
  }
});

export default styles;
