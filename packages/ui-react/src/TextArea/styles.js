/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */ /**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  input: {
    height: "auto",
    padding: "10px 0px",
    overflow: "auto"
  },
  characterCounter: {
    textAlign: "end",
    paddingTop: `${theme.spacing.xs}px`,
    minWidth: "150px",
    maxWidth: "610px"
  },
  inline: {
    display: "inline"
  },
  separator: {
    margin: `0 3px`
  },
  disabled: {
    ...theme.typography.disabled
  },
  maxCharacter: {
    ...theme.typography.body2
  },
  currentCounter: {
    ...theme.typography.subtitle2
  }
});

export default styles;
