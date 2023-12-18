import { createClasses } from "../../../utils/classes";

const switchStyle = {
  cursor: "pointer",
  display: "inline-flex",
  marginLeft: "10px",
};

export const { staticClasses, useClasses } = createClasses(
  "HvTable-SwitchColumnCell",
  {
    switchNo: {
      ...switchStyle,
    },
    switchYes: {
      ...switchStyle,
    },
  }
);
