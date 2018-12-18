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
  h1: {
    fontSize: theme.typography.xlargeTitle.fontSize,
    letterSpacing: theme.typography.xlargeTitle.letterSpacing,
    lineHeight: theme.typography.xlargeTitle.lineHeight,
    fontWeight: theme.typography.xlargeTitle.fontWeight,
  },
  h2: {
    fontSize: theme.typography.largeTitle.fontSize,
    letterSpacing: theme.typography.largeTitle.letterSpacing,
    lineHeight: theme.typography.largeTitle.lineHeight,
    fontWeight: theme.typography.largeTitle.fontWeight,
  },
  h3: {
    fontSize: theme.typography.mediumTitle.fontSize,
    letterSpacing: theme.typography.mediumTitle.letterSpacing,
    lineHeight: theme.typography.mediumTitle.lineHeight,
    fontWeight: theme.typography.mediumTitle.fontWeight,
  },
  h4: {
    fontSize: theme.typography.smallTitle.fontSize,
    letterSpacing: theme.typography.smallTitle.letterSpacing,
    lineHeight: theme.typography.smallTitle.lineHeight,
    fontWeight: theme.typography.smallTitle.fontWeight,
  },
  body1: {
    fontSize: theme.typography.normalText.fontSize,
    letterSpacing: theme.typography.normalText.letterSpacing,
    lineHeight: theme.typography.normalText.lineHeight,
    fontWeight: theme.typography.normalText.fontWeight
  },
  body2: {
    fontSize: theme.typography.infoText.fontSize,
    letterSpacing: theme.typography.infoText.letterSpacing,
    lineHeight: theme.typography.infoText.lineHeight,
    fontWeight: theme.typography.infoText.fontWeight
  },
  subtitle1: {
    fontSize: theme.typography.highlightText.fontSize,
    letterSpacing: theme.typography.highlightText.letterSpacing,
    lineHeight: theme.typography.highlightText.lineHeight,
    fontWeight: theme.typography.highlightText.fontWeight
  },
  subtitle2: {
    fontSize: theme.typography.labelText.fontSize,
    letterSpacing: theme.typography.labelText.letterSpacing,
    lineHeight: theme.typography.labelText.lineHeight,
    fontWeight: theme.typography.labelText.fontWeight
  }
});
