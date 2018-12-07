/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import chevronDown from "./assets/ChevronDown.svg";
import chevronUp from "./assets/ChevronUp.svg";

const styles = theme => ({
  selectRoot: {
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
    background: theme.palette.grey.smokey
  },
  selectGridLabel: {
    paddingBottom: 0
  },
  selectGridLabelText: {
    lineHeight: "12px"
  },
  selectGridContent: {
    paddingTop: theme.spacing.xs
  },
  selectGridContentElement: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    background: theme.palette.common.white,
    borderColor: theme.palette.grey.plain
  },
  chevron: {
    width: "16px",
    height: "16px",
    background: `url(${chevronUp})`
  },
  chevronUp: {
    background: `url(${chevronUp})`
  },
  chevronDown: {
    background: `url(${chevronDown})`
  }
});

export default styles;
