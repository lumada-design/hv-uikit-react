import { CSSInterpolation } from "@emotion/serialize";
import { outlineStyles } from "@core/utils";

export const styles: {
  actionContainer: CSSInterpolation;
  actionsInnerContainer: CSSInterpolation;
  closeAction: CSSInterpolation;
  iconContainer: CSSInterpolation;
} = {
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  actionsInnerContainer: {
    flexDirection: "row",
    marginTop: "8px", // avoid overlap with close button outline focus ring
  },
  closeAction: {
    alignSelf: "flex-end",
    cursor: "pointer",
    "&:focus": {
      ...outlineStyles,
    },
  },
  iconContainer: {
    width: "32px",
    height: "32px",
  },
};
