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
  header: {
    height: 40,
    backgroundColor: theme.palette.grey.rainy,
    ...theme.hv.typography.normalText,
    padding: "10px 0 0 15px",
    fontSize: 16
  },
  core: {
    backgroundColor: theme.palette.status.success,
    color: theme.palette.common.white
  },
  lab: {
    backgroundColor: theme.palette.status.warning,
    color: theme.palette.common.white
  },
  content: {
    width: "100%",
    padding: "30px 50px"
  },
  name: {
    fontWeight: theme.hv.typography.highlightText.fontWeight
  },
  title: {
    ...theme.hv.typography.highlightText,
    fontSize: 25,
    lineHeight: "50px"
  },
  link: {
    fontSize: 12
  },
  description: {
    ...theme.hv.typography.normalText,
    marginBottom: 20,
    maxWidth: 900
  }
});

export default styles;
