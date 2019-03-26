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
  menu: {
    display: "flex",
    flex: 1,
    justifyContent: "left",
    "& > a, > div": {
      paddingRight: `${theme.spacing.xs}px`
    },
    "& > a:last-child, > div:last-child": {
      paddingRight: "0px"
    }
  },
  "@media (max-width: 1120px)": {
    menu: {
      display: "none"
    }
  },
  listItem: {
    position: "relative",
    width: "unset",
    maxWidth: "170px",
    padding: `0 ${theme.spacing.xs}px 0 ${theme.spacing.xs}px`,
    "&:focus": {
      backgroundColor: theme.palette.common.white
    }
  },
  listItemText: {
    color: theme.palette.text.main,
    textTransform: "capitalize",
    padding: 0
  },
  label: {
    color: theme.palette.text.main,
    fontSize: "14px",
    letterSpacing: "0.02em",
    lineHeight: "32px"
  },
  selected: {
    "& p": {
      fontWeight: "bold",
      color: theme.hv.palette.accent.acce3
    }
  },
  selector: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: -7,
    left: 0,
    borderTop: `4px solid ${theme.hv.palette.accent.acce3}`
  }
});

export default styles;
