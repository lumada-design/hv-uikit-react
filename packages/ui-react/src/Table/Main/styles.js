/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

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
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
      borderBottom: "none",
      "& $thead": {
        background: theme.hv.palette.atmosphere.atmo5,
        textAlign: `right`,
        borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
        boxShadow: `none`,
        // Needed because of the HOC for the fixed columns
        top: "0 !important",
        "& $theadTh": {
          outline: "none",
          backgroundColor: theme.hv.palette.atmosphere.atmo5,
          minHeight: 32,
          minWidth: 72,
          paddingTop: 0,
          paddingBottom: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderLeft: "1px solid transparent",
          borderRight: "1px solid transparent",
          borderTop: "none",
          borderBottom: "none",
          boxShadow: "none",
          "& > div": { width: "100%" },
          "& > div.rt-resizer": {
            width: `${theme.hv.spacing.xs}px`,
            right: "-8px"
          },
          "&:first-child": {
            borderLeft: "none"
          },
          "&:last-child": {
            borderRight: "none"
          },
          "&.-sort-desc": {
            backgroundColor: theme.hv.palette.atmosphere.atmo3,
            borderLeftColor: theme.hv.palette.atmosphere.atmo6,
            borderRightColor: theme.hv.palette.atmosphere.atmo6
          },
          "&.-sort-asc": {
            backgroundColor: theme.hv.palette.atmosphere.atmo3,
            borderLeftColor: theme.hv.palette.atmosphere.atmo6,
            borderRightColor: theme.hv.palette.atmosphere.atmo6
          },
          "&.checkBox": {
            minWidth: "32px",
            display: "inline-table"
          },
          "&.sortable":{
            "&:hover > div > div > div ": {
              visibility: "visible"
            },
            "&:hover": {
              background: theme.hv.palette.atmosphere.atmo4
            },
          }
        }
      },
      "& $tbody": {
        "& $trGroups": {
          borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
          "& $tr > div ": {
            background: "white",
            position: "relative"
          },
          "& $tr:hover > div ": {
            background: "white"
          }
        },
        "& $td": {
          border: "1px solid transparent",
          padding: `0px ${theme.hv.spacing.xs}px`,
          minWidth: "72px",
          "&.alphaNumeric": {
            paddingLeft: "32px"
          },
          "&.link": {
            paddingLeft: "32px"
          },
          "&:first-child": {
            borderLeft: "none"
          },
          "&:last-child": {
            borderRight: "none"
          }
        },
        "& .firstExpandable": {
          paddingLeft: "0px"
        },
        "& $td.sorted": {
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
          borderTop: "none",
          borderBottom: "none"
        },
        "& .checkBox": {
          minWidth: "32px"
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
    ...theme.typography.subtitle2
  },
  theadTh: {},

  theadFilter: {},
  theadFilterTr: {},
  theadFilterTh: {},
  tbody: {},
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
    marginRight: `${theme.hv.spacing.xs}px`,
    width: "32px",
    height: "32px",
    position: "absolute",
    bottom: "0",
    left: "0"
  },
  sortedIconShown: {
    visibility: "visible"
  },
  sortedIconHidden: {
    visibility: "hidden"
  },
  pointer: {
    cursor: "pointer"
  },
  subtitle: {
    marginTop: `${theme.hv.spacing.xs}px`
  },
  title: {
    marginBottom: `${theme.hv.spacing.sm}px`
  },
  headerContainer: {
    width: "100%",
    minHeight: "32px"
  },
  headerTextContainer: {
    padding: "8px 5px 8px 0px",
    minHeight: "32px",
    overflow: "auto"
  },
  headerProps: {
    width: "100%",
    whiteSpace: "normal"
  },
  headerAlphaNumeric: {
    float: "left",
    paddingLeft: "27px",
    textAlign: "left"
  },
  headerNumeric: {
    float: "right",
    textAlign: "right"
  },

  centered: {
    justifyContent: "center"
  },
  alphaNumeric: {
    justifyContent: "flex-start"
  },
  numeric: {
    justifyContent: "flex-end",
    textAlign: "right"
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
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
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
  }
});

export { styles, tableStyleOverrides };
