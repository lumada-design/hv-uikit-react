/*
 * Copyright 2020 Hitachi Vantara Corporation
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
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    margin: `${theme.hv.spacing.xs}px 0 0`,
    padding: `${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px  0`
  },
  label: {
    marginBottom: "5px"
  },
  ul: {
    paddingInlineStart: 0,
    margin: 0,
    "& > :not(:last-child)": {
      paddingBottom: "8px"
    }
  }
});

export default styles;
