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
    color: theme.typography.xlargeTitle.color,
    fontSize: theme.typography.xlargeTitle.fontSize,
    letterSpacing: theme.typography.xlargeTitle.letterSpacing,
    lineHeight: theme.typography.xlargeTitle.lineHeight,
    fontWeight: theme.typography.xlargeTitle.fontWeight
  },
  h2: {
    color: theme.typography.largeTitle.color,
    fontSize: theme.typography.largeTitle.fontSize,
    letterSpacing: theme.typography.largeTitle.letterSpacing,
    lineHeight: theme.typography.largeTitle.lineHeight,
    fontWeight: theme.typography.largeTitle.fontWeight
  },
  h3: {
    color: theme.typography.mediumTitle.color,
    fontSize: theme.typography.mediumTitle.fontSize,
    letterSpacing: theme.typography.mediumTitle.letterSpacing,
    lineHeight: theme.typography.mediumTitle.lineHeight,
    fontWeight: theme.typography.mediumTitle.fontWeight
  },
  h4: {
    color: theme.typography.smallTitle.color,
    fontSize: theme.typography.smallTitle.fontSize,
    letterSpacing: theme.typography.smallTitle.letterSpacing,
    lineHeight: theme.typography.smallTitle.lineHeight,
    fontWeight: theme.typography.smallTitle.fontWeight
  },
  body1: {
    color: theme.typography.normalText.color,
    fontSize: theme.typography.normalText.fontSize,
    letterSpacing: theme.typography.normalText.letterSpacing,
    lineHeight: theme.typography.normalText.lineHeight,
    fontWeight: theme.typography.normalText.fontWeight
  },
  body2: {
    color: theme.typography.infoText.color,
    fontSize: theme.typography.infoText.fontSize,
    letterSpacing: theme.typography.infoText.letterSpacing,
    lineHeight: theme.typography.infoText.lineHeight,
    fontWeight: theme.typography.infoText.fontWeight
  },
  subtitle1: {
    color: theme.typography.highlightText.color,
    fontSize: theme.typography.highlightText.fontSize,
    letterSpacing: theme.typography.highlightText.letterSpacing,
    lineHeight: theme.typography.highlightText.lineHeight,
    fontWeight: theme.typography.highlightText.fontWeight
  },
  subtitle2: {
    color: theme.typography.labelText.color,
    fontSize: theme.typography.labelText.fontSize,
    letterSpacing: theme.typography.labelText.letterSpacing,
    lineHeight: theme.typography.labelText.lineHeight,
    fontWeight: theme.typography.labelText.fontWeight
  },
  button: {
    color: theme.typography.buttonText.color,
    fontSize: theme.typography.buttonText.fontSize,
    letterSpacing: theme.typography.buttonText.letterSpacing,
    lineHeight: theme.typography.buttonText.lineHeight,
    fontWeight: theme.typography.buttonText.fontWeight
  }
});

typography.disabled = {
  color: theme.typography.disabledText.color,
  fontSize: theme.typography.disabledText.fontSize,
  letterSpacing: theme.typography.disabledText.letterSpacing,
  lineHeight: theme.typography.disabledText.lineHeight,
  fontWeight: theme.typography.disabledText.fontWeight
};

typography.info = {
  color: theme.typography.infoText.color,
  fontSize: theme.typography.infoText.fontSize,
  letterSpacing: theme.typography.infoText.letterSpacing,
  lineHeight: theme.typography.infoText.lineHeight,
  fontWeight: theme.typography.infoText.fontWeight
};

typography.sliderTrack = {
  color: theme.typography.sliderTrackText.color,
  fontSize: theme.typography.sliderTrackText.fontSize,
  letterSpacing: theme.typography.sliderTrackText.letterSpacing,
  lineHeight: theme.typography.sliderTrackText.lineHeight,
  fontWeight: theme.typography.sliderTrackText.fontWeight
};

typography.visualization = {
  color: theme.typography.visualizationText.color,
  fontSize: theme.typography.visualizationText.fontSize,
  letterSpacing: theme.typography.visualizationText.letterSpacing,
  lineHeight: theme.typography.visualizationText.lineHeight,
  fontWeight: theme.typography.visualizationText.fontWeight
};

export default typography;
