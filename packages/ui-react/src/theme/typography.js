/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import createTypography from "@material-ui/core/styles/createTypography";
import theme from "@hv-ui/themes/dist/theme";
import palette from "./palette";

export default createTypography(palette, {
  useNextVariants: true,
  suppressDeprecationWarnings: true,
  fontFamily: theme.typography.fontFamily,
  body1: {
    fontSize: theme.typography.normalText.fontSize,
    letterSpacing: theme.typography.normalText.letterSpacing,
    lineHeight: theme.typography.normalText.lineHeight,
    fontWeight: theme.typography.normalText.fontWeight
  },
  body2: {

  },
  subtitle1: {

  },
  subtitle2: {
    fontSize: theme.typography.labelText.fontSize,
    letterSpacing: theme.typography.labelText.letterSpacing,
    lineHeight: theme.typography.labelText.lineHeight,
    fontWeight: theme.typography.labelText.fontWeight
  }
});
