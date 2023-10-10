import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const name = "HvScrollToVertical";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    display: "flex",
    width: "32px",
    padding: "0",
    margin: 0,
    listStyleType: "none",
    flexWrap: "wrap",
    flexDirection: "column",
    backdropFilter: `blur(4px)`,
  },
  positionAbsolute: {
    width: "32px",
    position: "absolute",
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    right: "0",
  },
  positionFixed: {
    width: "32px",
    position: "fixed",
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    right: "0",
  },
});

export const calculateOffset = (quantityOfOptions: number) => {
  const itemSize = 32;
  const halfOptions = Math.round(quantityOfOptions * 0.5);

  return halfOptions * itemSize;
};
