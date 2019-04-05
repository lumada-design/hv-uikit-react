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
  anchorOriginTopRight: {
    top: `${theme.hv.spacing.xs}px`,
    right: `${theme.hv.spacing.xs}px`
  },
  anchorOriginTopLeft: {
    top: `${theme.hv.spacing.xs}px`,
    left: `${theme.hv.spacing.xs}px`
  },
  anchorOriginTopCenter: {
    top: `${theme.hv.spacing.xs}px`
  },
  anchorOriginBottomCenter: {
    bottom: `${theme.hv.spacing.xs}px`
  },
  anchorOriginBottomLeft: {
    bottom: `${theme.hv.spacing.xs}px`,
    left: `${theme.hv.spacing.xs}px`
  },
  anchorOriginBottomRight: {
    bottom: `${theme.hv.spacing.xs}px`,
    right: `${theme.hv.spacing.xs}px`
  }
});

export default styles;
