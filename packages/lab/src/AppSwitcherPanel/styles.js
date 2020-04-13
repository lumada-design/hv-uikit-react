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

const styles = (theme) => ({
  root: {
    display: "none",
    width: "320px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: `0 2px 12px rgba(65, 65, 65, 0.12)` // rgb color corresponds to #414141;
  },
  open: {
    display: "flex",
    zIndex: "1200",
    flexDirection: "column",
    position: "absolute",
    top: "50px",
    overflowX: "hidden"
  },

  headerContainer: {
    ...theme.hv.typography.highlightText,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.hv.spacing.sm}px`,
    borderBottom: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },

  actionsContainer: {
    flex: 1,
    padding: `${theme.hv.spacing.sm}px`,
    overflowY: "auto"
  },

  footerContainer: {
    ...theme.hv.typography.highlightText,
    display: "flex",
    alignItems: "center",
    height: "52px",
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    padding: `${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px`
  },
});

export default styles;
