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
  getTheadFilterThProps: () => ({className: classes.theadFilterTh  }),
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
      border: `solid 1px ${theme.palette.grey.plain}`,
      borderBottom: "none",
      "& $thead": {
        background: theme.palette.grey.rainy,
        textAlign: `right`,
        borderBottom: `solid 1px ${theme.palette.grey.plain}`,
        boxShadow: `none`,
        "& $theadTh": {
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          border: "none",
          boxShadow: "none"
        }
      },
      "& $tbody": {
        "& $trGroups": {
          borderBottom: `solid 1px ${theme.palette.grey.plain}`
        },
        "& $td": {
          border: "none"
        }
      }
    },
    "& $td": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    }
  },
  table: {},
  theadGroup: {},
  theadGroupTr: {},
  theadGroupTh: {},
  thead: {},
  theadTh: {},
  theadFilter: {},
  theadFilterTr: {},
  theadFilterTh : {},
  tbody: {},
  trGroups: {},
  tr: {},
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
    marginRight: `${theme.spacing.xs}px`
  },
});

export { styles, tableStyleOverrides };
