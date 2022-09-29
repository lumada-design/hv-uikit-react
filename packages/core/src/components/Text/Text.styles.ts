import { css, CSSObject } from "@emotion/react";
import { themeVars } from "theme";
import type { TextProps } from "./Text";

const TAGS = ["h1", "h2", "h3", "h4", "h5", "p"];

export const getTagStyles: {
  [key in typeof TAGS[number]]: CSSObject;
} = {
  h1: {
    color: themeVars.colors.acce1,
    fontWeight: themeVars.fontWeight.bold,
    fontSize: "4rem",
  },
  h2: {
    color: themeVars.colors.acce1,
    lineHeight: themeVars.lineHeight.normal,
    fontWeight: themeVars.fontWeight.bold,
    fontSize: "2.5rem",
  },
  h3: {
    color: themeVars.colors.acce1,
    lineHeight: themeVars.lineHeight.normal,
    fontWeight: themeVars.fontWeight.semibold,
    fontSize: "1.75rem",
  },
  h4: {
    color: themeVars.colors.acce1,
    lineHeight: themeVars.lineHeight.normal,
    fontWeight: themeVars.fontWeight.semibold,
    fontSize: "1.25rem",
  },
  h5: {
    color: themeVars.colors.acce1,
    lineHeight: themeVars.lineHeight.normal,
    fontWeight: themeVars.fontWeight.semibold,
    fontSize: themeVars.fontSize.base,
  },
  p: {
    margin: "1rem 0",
  },
};

const baseStyles: CSSObject = {
  lineHeight: themeVars.lineHeight.normal,
  color: themeVars.colors.acce1,
};

export const getStyles = ({
  as,
}: Pick<TextProps, "as">): ReturnType<typeof css> => {
  const textStyles = TAGS.includes(as as string) && getTagStyles[as as string];

  const styles = {
    ...baseStyles,
    ...textStyles,
  };

  return css(styles);
};
