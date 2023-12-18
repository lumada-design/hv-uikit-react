import { createClasses } from "../../../utils/classes";
import { outlineStyles } from "../../../utils/focusUtils";

const name = "HvBannerActionContainer";

export const { staticClasses, useClasses } = createClasses(name, {
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
});
