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
  navigationContainer: {
    display: "contents"
  },
  menuContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    height: "100%",
    zIndex: 2
  },
  emptyContainer: {
    width: "100%",
  },
  menu: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    "& > a, > div": {
      paddingRight: `0px`,
      margin: `0px 0 ${theme.hv.spacing.xs}px 0`
    },
    "& > a:last-child, > div:last-child": {
      paddingRight: "0px",
      margin: `0px 0 ${theme.hv.spacing.xs}px 0`
    }
  },
  subMenuCurtain: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    left: 0,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  subMenuContainer: {
    width: "100%",
    height: "40px",
    position: "absolute",
    boxShadow: "0 0 0 #fff, 0px 6px 12px rgba(65,65,65,.12);",
    top: "46px",
    left: "0",
    backgroundColor: theme.hv.palette.atmosphere.atmo3
  },
  subMenu: {
    "& > a, > div": {
      margin: "0",
      borderTop: `2px solid transparent`
    },
    "& > a:last-child, > div:last-child": {
      margin: "0",
      borderTop: `2px solid transparent`
    }
  },
  listItem: {
    position: "relative",
    width: "unset",
    maxWidth: "170px",
    height: "100%",
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo1
    },
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  subListItem: {
    maxWidth: "200px",
    "&:focus": {
      backgroundColor: "transparent"
    }
  },
  listItemText: {
    padding: 0
  },
  label: {
    color: theme.palette.text.main,
    fontSize: "14px",
    letterSpacing: "0.02em",
    lineHeight: "32px",
    fontFamily: theme.hv.typography.fontFamily
  },
  selected: {
    "& p": {
      color: theme.hv.typography.selectedNavText.color,
      fontWeight: theme.hv.typography.selectedNavText.fontWeight
    },
  },
  selectedButton: {
    borderTop: `2px solid ${theme.hv.palette.accent.acce3}`
  },
  notSelectedButton: {
    borderTop: `2px solid transparent`
  }
});

export default styles;
