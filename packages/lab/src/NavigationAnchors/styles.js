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
  drawerPaper: {
    width: 200,
    marginLeft: `${theme.hv.spacing.xs}px`,
    background: "none",
    borderRight: "none"
  },
  drawerPaperPositionInherit: {
    position: "inherit"
  },
  listRoot: {
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  listDense: {
    paddingTop: 0,
    paddingBottom: 0
  },
  listItemRoot: {
    height: 32,
    background: "none",
    marginBottom: "8px",
    "&:last-child": {
      marginBottom: "0"
    },
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`
    },
    "&$listItemSelected": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`
    },
    "&$listItemSelected:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  listItemGutters: {
    "@media (min-width: 600px)": {
      padding: `0 ${theme.hv.spacing.xs}px`
    }
  },
  listItemSelected: {
    left: "-1px",
    borderLeft: `4px solid ${theme.hv.palette.accent.acce1}`,
    "@media (min-width: 600px)": {
      paddingLeft: 7
    }
  },
  listItemTextDense: {
    fontSize: theme.hv.typography.normalText.fontSize,
    fontWeight: "inherit"
  },
  listItemTextSelected: {
    ...theme.hv.typography.highlightText
  }
});

export default styles;
