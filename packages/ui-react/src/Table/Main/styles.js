/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  getProps: () => ({
    style: {
      ...theme.hv.typography.normalText,
      fontFamily: theme.hv.typography.fontFamily,
      textAlign: "right",
      border: "none"
    }
  }),
  getTableProps: () => ({
    style: {
      border: `solid 1px ${theme.palette.grey.plain}`,
      borderBottom: "none"
    }
  }),
  getTheadProps: () => ({
    style: {
      background: theme.palette.grey.rainy,
      textAlign: `right`,
      borderBottom: `solid 1px ${theme.palette.grey.plain}`,
      boxShadow: `none`
    }
  }),
  getTrGroupProps: () => ({
    style: {
      borderBottom: `solid 1px ${theme.palette.grey.plain}`
    }
  }),
  getTdProps: () => ({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      border: "none"
    }
  }),
  getTheadThProps: () => ({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      border: "none",
      boxShadow: "none"
    }
  }),
  rtSortIcon: {
    marginRight: `${theme.spacing.xs}px`
  }
});

export default styles;
