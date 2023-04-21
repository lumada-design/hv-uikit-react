import { theme } from "@hitachivantara/uikit-styles";
import { CSSInterpolation } from "@emotion/serialize";

export const styles: {
  root: CSSInterpolation;
  titleShort: CSSInterpolation;
  title: CSSInterpolation;
  subheader: CSSInterpolation;
  action: CSSInterpolation;
} = {
  root: { padding: `15px ${theme.space.sm}`, position: "relative" },
  titleShort: {
    fontFamily: theme.fontFamily.body,
    marginRight: "30px",
  },
  title: {
    fontFamily: theme.fontFamily.body,
  },
  subheader: {
    fontFamily: theme.fontFamily.body,
  },
  action: {
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "0px",
    paddingLeft: theme.space.xs,
    top: "15px",
  },
};
