import { theme } from "@hitachivantara/uikit-styles";
import { CSSInterpolation } from "@emotion/css";

export const createClasses = (
  css: (...args: CSSInterpolation[]) => string
) => ({
  root: css({ padding: `15px ${theme.space.sm}`, position: "relative" }),
  titleShort: css({
    fontFamily: theme.fontFamily.body,
    marginRight: "30px",
  }),
  title: css({
    fontFamily: theme.fontFamily.body,
  }),
  subheader: css({
    fontFamily: theme.fontFamily.body,
  }),
  action: css({
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "0px",
    paddingLeft: theme.space.xs,
    top: "15px",
  }),
});
