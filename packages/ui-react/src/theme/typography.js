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

const typography = createTypography(palette, {
  useNextVariants: true,
  suppressDeprecationWarnings: true,
  fontFamily: theme.typography.fontFamily,
  h1: {
    ...theme.typography.xlTitle.color
  },
  h2: {
    ...theme.typography.lTitle.color
  },
  h3: {
    ...theme.typography.mTitle
  },
  h4: {
    ...theme.typography.sTitle
  },
  body1: {
    ...theme.typography.normalText
  },
  body2: {
    ...theme.typography.infoText
  },
  subtitle1: {
    ...theme.typography.highlightText
  },
  subtitle2: {
    ...theme.typography.labelText
  },
  button: {
    ...theme.typography.highlightText
  }
});

export default typography;
