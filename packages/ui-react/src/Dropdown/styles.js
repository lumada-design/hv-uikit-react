/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import chevronDown from "./assets/AngleDown-12.svg";
import chevronDownDisabled from "./assets/AngleDown-disabled-12.svg";
import chevronUp from "./assets/AngleUp-12.svg";

const styles = theme => ({
  label: {
    color: theme.typography.subtitle1.color,
    fontSize: theme.typography.subtitle1.fontSize,
    letterSpacing: theme.typography.subtitle1.letterSpacing,
    lineHeight: theme.typography.subtitle1.lineHeight,
    fontWeight: theme.typography.subtitle1.fontWeight
  },
  dropdownButtonContainer: {
    background: theme.palette.common.white,
    height: "32px",
    display: "flex",
    border: `1px solid ${theme.palette.grey.plain}`,
    "&:hover": {
      border: `1px solid ${theme.palette.grey.inspire}`
    },
    "&:focus": {
      outline: "none"
    }
  },
  dropdownOpenButtonContainer: {
    background: theme.palette.common.white,
    height: "32px",
    display: "flex",
    border: `1px solid ${theme.palette.grey.inspire}`,
    borderBottom: "none",
    "&:focus": {
      outline: "none"
    }
  },
  dropdownButton: {
    height: "10px",
    paddingTop: "10px",
    paddingLeft: "10px",
    paddingBottom: "10px",
    width: "calc(100% - 32px - 10px)",
    background: theme.palette.common.white,
    fontWeight: theme.typography.body1.fontWeight,
    letterSpacing: theme.typography.body1.letterSpacing,
    color: theme.typography.body1.color,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    cursor: "pointer"
  },
  buttonDisabled: {
    background: theme.palette.grey.clear,
    "&:hover": {
      cursor: "not-allowed"
    }
  },
  dropdownButtonContainerDisabled: {
    "&:hover": {
      border: `1px solid ${theme.palette.grey.plain}`,
      cursor: "not-allowed"
    }
  },
  dropdownButtonTextDisabled: {
    position: "relative",
    bottom: "1px",
    fontWeight: theme.typography.disabled.fontWeight,
    letterSpacing: theme.typography.disabled.letterSpacing,
    color: theme.typography.disabled.color,
    fontSize: theme.typography.disabled.fontSize,
    lineHeight: theme.typography.disabled.lineHeight,
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  dropdownButtonText: {
    position: "relative",
    bottom: "4px",
    fontWeight: theme.typography.body1.fontWeight,
    letterSpacing: theme.typography.body1.letterSpacing,
    color: theme.typography.body1.color,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  dropdownContainer: {
    position: "absolute",
    width: "inherit",
    zIndex: "4"
  },
  itemContainer: {
    padding: "0 10px",
    height: "32px",
    "& > label > span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  },
  checkBoxItem: {
    width: "calc(100% - 10px)"
  },
  checkBoxItemHighlight: {
    width: "calc(100% - 10px)",
    "& > span": {
      color: theme.typography.subtitle1.color,
      fontSize: theme.typography.subtitle1.fontSize,
      letterSpacing: theme.typography.subtitle1.letterSpacing,
      lineHeight: theme.typography.subtitle1.lineHeight,
      fontWeight: theme.typography.subtitle1.fontWeight,
    }
  },
  singleItem: {
    background: theme.palette.common.white,
    height: "calc(100% - 20px)",
    padding: "10px",
    fontWeight: theme.typography.body1.fontWeight,
    letterSpacing: theme.typography.body1.letterSpacing,
    color: theme.typography.body1.color,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    "&:hover": {
      background: theme.palette.grey.inspire,
      color: theme.palette.common.white
    }
  },
  singleItemSelected: {
    background: theme.palette.grey.inspire,
    height: "calc(100% - 20px)",
    padding: "10px",
    fontWeight: theme.typography.body1.fontWeight,
    letterSpacing: theme.typography.body1.letterSpacing,
    color: theme.palette.common.white,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    "&:hover": {
      background: theme.palette.grey.inspire,
      color: theme.palette.common.white
    }
  },
  singleItemLabel: {
    position: "relative",
    bottom: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  blankSearch: {
    background: "transparent",
    height: "14px"
  },
  dropdownMultipleSelection: {
    border: `1px solid ${theme.palette.grey.inspire}`,
    borderTop: "none",
    borderBottom: "none",
    "& > div": {
      marginTop: "14px"
    }
  },
  dropdownMultipleSelectionSearch: {
    border: `1px solid ${theme.palette.grey.inspire}`,
    borderTop: "none",
    borderBottom: "none"
  },
  dropdownSimpleSelection: {
    border: `1px solid ${theme.palette.grey.inspire}`,
    borderTop: "none",
    "& > div": {
      marginTop: "14px"
    }
  },
  dropdownSimpleSelectionSearch: {
    border: `1px solid ${theme.palette.grey.inspire}`,
    borderTop: "none"
  },
  buttonContainer: {
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey.inspire}`,
    borderTop: "none",
    color: theme.typography.subtitle1.color,
    fontSize: theme.typography.subtitle1.fontSize,
    letterSpacing: theme.typography.subtitle1.letterSpacing,
    lineHeight: theme.typography.subtitle1.lineHeight,
    fontWeight: theme.typography.subtitle1.fontWeight,
    position: "relative",
    bottom: "2px",
    padding: "20px 0 10px 94px"
  },
  button: {
    // this is a hack because inspire link button doesn't exist
    color: theme.typography.subtitle1.color,
    fontSize: theme.typography.subtitle1.fontSize,
    letterSpacing: theme.typography.subtitle1.letterSpacing,
    lineHeight: theme.typography.subtitle1.lineHeight,
    fontWeight: theme.typography.subtitle1.fontWeight,
    "& span": {
      color: theme.typography.subtitle1.color
    }
  },
  searchContainer: {
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  selectRoot: {
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
    background: theme.palette.grey.smokey
  },
  iconContainer: {
    width: "32px",
    height: "32px"
  },
  icon: {
    width: "12px",
    height: "12px",
    padding: "10px",
    background: `url(${chevronUp})`
  },
  chevronUp: {
    background: `url(${chevronUp})`,
    cursor: "pointer"
  },
  chevronDown: {
    background: `url(${chevronDown})`,
    cursor: "pointer"
  },
  chevronDownDisabled: {
    background: `url(${chevronDownDisabled})`,
    cursor: "not-allowed"
  }
});

export default styles;
