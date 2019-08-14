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

import lock from "./assets/Lock.svg";
import lockSelected from "./assets/LockSelected.svg";
import trash from "./assets/Trash.svg";
import trashSelected from "./assets/TrashSelected.svg";

const tableStyleOverrides = classes => ({
  getProps: () => ({ className: classes.root }),
  getTableProps: () => ({ className: classes.table }),
  getTheadGroupProps: () => ({ className: classes.theadGroup }),
  getTheadGroupTrProps: () => ({ className: classes.theadGroupTr }),
  getTheadGroupThProps: () => ({ className: classes.theadGroupTh }),
  getTheadProps: () => ({ className: classes.thead }),
  getTheadThProps: () => ({ className: classes.theadTh }),
  getTheadFilterProps: () => ({ className: classes.theadFilter }),
  getTheadFilterTrProps: () => ({ className: classes.theadFilterTr }),
  getTheadFilterThProps: () => ({ className: classes.theadFilterTh }),
  getTbodyProps: () => ({ className: classes.tbody }),
  getTrGroupProps: () => ({ className: classes.trGroups }),
  getTrProps: () => ({ className: classes.tr }),
  // getThProps: () => ({ className: classes.th }), TODO: There is a bug in the component, where this prop is not used
  getTdProps: () => ({ className: classes.td }),
  getTfootProps: () => ({ className: classes.tfoot }),
  getTfootTrProps: () => ({ className: classes.tfootTr }),
  getTfootThProps: () => ({ className: classes.tfootTh }),
  getPaginationProps: () => ({ className: classes.pagination }),
  getLoadingProps: () => ({ className: classes.loading }),
  getNoDataProps: () => ({ className: classes.noDate }),
  getResizerProps: () => ({ className: classes.resizer })
});

const styles = theme => ({
  root: {
    ...theme.hv.typography.normalText,
    fontFamily: theme.hv.typography.fontFamily,
    textAlign: "right",
    border: "none",
    "& $table": {
      "& $thead": {
        background: theme.hv.palette.atmosphere.atmo1,
        textAlign: `right`,
        borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        boxShadow: `none`,
        // Needed because of the HOC for the fixed columns
        top: "0 !important",
        "& $theadTh": {
          outline: "none",
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          minHeight: 32,
          minWidth: 72,
          padding: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderLeft: "1px solid transparent",
          borderRight: "1px solid transparent",
          borderTop: "none",
          borderBottom: "none",
          boxShadow: "none",
          "& > div": {
            width: "100%",
            margin: "1px 0px",
            alignSelf: "baseline"
          },
          "& > div.rt-resizer": {
            width: `${theme.hv.spacing.xs}px`,
            right: "-8px"
          },
          "&:first-child:not(.checkbox)": {
            borderLeft: "none"
          },
          "&:nth-last-child(2).-secondaryActionsNeighbor": {
            borderRightColor: theme.hv.palette.atmosphere.atmo5
          },
          "&:last-child": {
            borderRight: "none"
          },
          "&.secondaryAction": {
            minWidth: "31px",
            maxWidth: "31px",
            height: "100%",
            display: "inline-table",
            borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
          },
          "&.-sort-desc": {
            backgroundColor: theme.hv.palette.atmosphere.atmo3,
            borderLeftColor: theme.hv.palette.atmosphere.atmo4,
            borderRightColor: theme.hv.palette.atmosphere.atmo4
          },
          "&.-sort-asc": {
            backgroundColor: theme.hv.palette.atmosphere.atmo3,
            borderLeftColor: theme.hv.palette.atmosphere.atmo4,
            borderRightColor: theme.hv.palette.atmosphere.atmo4
          },
          "&.checkBox": {
            minWidth: "30px",
            height: "100%",
            display: "inline-table",
            borderRightColor: theme.hv.palette.atmosphere.atmo5
          },
          "& ~.rt-th.rthfc-th-fixed-left-last": {
            borderLeft: "none"
          },
          "&.rt-th.rthfc-th-fixed-left-last": {
            borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`
          },
          "&.rt-th.rthfc-th-fixed-right-first": {
            borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`
          },
          "&.sortable": {
            "&:hover > div > div > div ": {
              visibility: "visible"
            },
            "&:hover": {
              background: theme.hv.palette.atmosphere.atmo4
            }
          }
        }
      },
      "& $tbody": {
        "& $trGroups": {
          borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
          "& $tr > div ": {
            background: theme.hv.palette.atmosphere.atmo2,
          },
          "& $tr:hover > div ": {
            background: theme.hv.palette.atmosphere.atmo1
          },
          "& $tr.selected > div": {
            background: theme.hv.palette.atmosphere.atmo1
          }
        },
        "& $td": {
          border: "1px solid transparent",
          padding: `0px ${theme.hv.spacing.xs}px`,
          minWidth: "72px",
          "&.sortable": {
            paddingLeft: "32px",
          },
          "&.alphaNumeric": {
            minWidth: "70px",
            textAlign: "left"
          },
          "&.link": {
            paddingLeft: "32px"
          },
          "&.secondaryAction": {
            minWidth: "31px",
            maxWidth: "31px",
            padding: 0,
            borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
            overflow: "visible"
          },
          "&:first-child": {
            borderLeft: "none"
          },
          "&:last-child": {
            borderRight: "none"
          },
          "&.rt-td.rthfc-td-fixed-left-last": {
            borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`
          },
          "&.rt-td.rthfc-td-fixed-right-first": {
            borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`
          },
        },
        "& .firstExpandable": {
          paddingLeft: "0px"
        },
        "& $td.sorted": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
          borderTop: "none",
          borderBottom: "none"
        },
        "& .checkBox": {
          minWidth: "30px",
          maxWidth: "30px",
          borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
        }
      }
    },
    "& $td": {
      display: "flex",
      alignItems: "center"
    }
  },
  table: {},
  theadGroup: {},
  theadGroupTr: {},
  theadGroupTh: {},
  thead: {
    ...theme.hv.typography.labelText
  },
  theadTh: {},

  theadFilter: {},
  theadFilterTr: {},
  theadFilterTh: {},
  tbody: {},
  tBodyEmpty: {
    minHeight: "calc(32px * 3)"
  },
  trGroups: {},
  tr: {
    height: "32px",
    "& $textContainer": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "left"
    }
  },
  textContainer: {},
  // th: {}, TODO: There is a bug in the component, where this prop is not used
  td: {},
  tfoot: {},
  tfootTr: {},
  tfootTh: {},
  pagination: {},
  loading: {},
  noDate: {},
  resizer: {},
  rtSortIcon: {
    width: "32px",
    height: "32px",
    position: "absolute"
  },
  sortedIconShown: {
    visibility: "visible"
  },
  sortedIconHidden: {
    display: "none"
  },
  pointer: {
    cursor: "pointer"
  },
  tableContainer: {},
  subtitle: {
    marginTop: `${theme.hv.spacing.xs}px`
  },
  title: {
    marginBottom: `${theme.hv.spacing.sm}px`
  },
  checkBoxBorder: {
    "&:nth-child(2)": {
      borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  checkBoxRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: `${theme.hv.spacing.xs}px`
  },
  link: {
    justifyContent: "flex-start",
    "& > a": {
      ...theme.hv.typography.inlineLink,
      textDecoration: "none"
    }
  },
  subComponentContainer: {
    width: "100%",
    height: "100%",
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    background: theme.hv.palette.atmosphere.atmo1,
    padding: `${theme.hv.spacing.md}px 32px`
  },
  iconContainer: {
    width: "32px",
    height: "32px",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  firstWithNumeric: {
    width: "calc(100% - 32px)"
  },
  lockIcon: {
    background: `url(${lock}) no-repeat center`,
    width: "32px",
    height: "32px"
  },
  lockIconSelected: {
    background: `url(${lockSelected}) no-repeat center`,
    width: "32px",
    height: "32px"
  },
  trashIcon: {
    background: `url(${trash}) no-repeat center`,
    width: "32px",
    height: "32px"
  },
  trashIconSelected: {
    width: "32px",
    height: "32px",
    background: `url(${trashSelected}) no-repeat center`
  },
  checkBoxText: {
    display: "flex",
    alignItems: "center"
  },
  menuItem: {
    ...theme.hv.typography.normalText,
    textAlign: "right",
    marginBottom: "-6px",
    marginTop: "-6px"
  }
});

export { styles, tableStyleOverrides };
